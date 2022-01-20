const path = require(`path`)
const fetch = require('node-fetch')
const webpack = require('webpack')
const _ = require('lodash')
const { createFilePath } = require('gatsby-source-filesystem')

const controlledBlogTags = require('./src/page-content/content-blog.json').tags

// unfortunately not possible because JS/TS
// const { slugify } = require('./src/util')
const slugify = (text) => {
  return text.toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
}

const createTagPages = (createPage, posts) => {
  const tagPageTemplate = path.resolve(`src/templates/blog-tag.tsx`)

  const postsByTags = {}

  const processTags = (node) => (arr) => arr
    .filter(Boolean)
    .forEach(tagName => {
      const tagSlug = slugify(tagName)
      if (!postsByTags[tagSlug]) {
        postsByTags[tagSlug] = { posts: [], tagName: tagName.trim() }
      }

      if (postsByTags[tagSlug].posts.find(({id}) => id === node.id)) return;

      postsByTags[tagSlug].posts.push(node)
    })

  posts.forEach(({node}) => {
    if (node.frontmatter?.tags) {
      processTags(node)(node.frontmatter.tags)
    }
    if (node.frontmatter?.category) {
      processTags(node)([node.frontmatter.category])
    }
    if (node.frontmatter?.seo?.keywords) {
      processTags(node)(node.frontmatter.seo.keywords.split(','))
    }
  })

  const tags = Object.keys(postsByTags)

  const tagsSet = new Set(tags
    .concat(controlledBlogTags.map(({ name }) => slugify(name))));

  tagsSet.forEach(tagSlug => {
    if (!postsByTags[tagSlug]) return;

    createPage({
      path: `/blog/tag/${tagSlug}`,
      component: tagPageTemplate,
      context: {
        ...(postsByTags[tagSlug] || {}),
        tagSlug,
      }
    })
  })
}

const trimLeft = (s, charlist) => {
  if (charlist === undefined) {
    return s.replace(new RegExp('^[s]+'), '')
  }

  return s.replace(new RegExp('^[' + charlist + ']+'), '')
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const result = await graphql(`
    {
      allMdx(filter: { frontmatter: { published: { ne: false } } }) {
        edges {
          node {
            id
            fileAbsolutePath
            excerpt(pruneLength: 250)
            frontmatter {
              publishedAt(formatString: "MMMM DD, YYYY")
              featuredimage {
                childImageSharp {
                  gatsbyImageData
                }
              }
              title
              subtitle
              teaser
              overline
              path
              slug
              tags
              category
              seo { keywords }
            }
          }
        }
      }
    }
  `)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query: ${result.errors}`)
    return
  }

  createTagPages(createPage, result.data.allMdx.edges)

  result.data.allMdx.edges.forEach(({ node }) => {
    let template = path.resolve(`src/templates/page.tsx`)
    let isSummit = false
    if (node.fileAbsolutePath.indexOf('markdown/blog') > -1) {
      template = path.resolve(`src/templates/blog.tsx`)
    } else if (node.fileAbsolutePath.indexOf('markdown/pages') > -1) {
      template = path.resolve(`src/templates/page.tsx`)
    } else if (node.fileAbsolutePath.indexOf('markdown/summit') > -1) {
      isSummit = true
      template = path.resolve(`src/templates/summit.tsx`)
    } else if (node.fileAbsolutePath.indexOf('markdown/jobs') > -1) {
      template = path.resolve(`src/templates/jobs.tsx`)
    }

    createPage({
      path: isSummit
        ? `/summit/2021/${trimLeft(node.frontmatter.slug, '/')}/`
        : `/${trimLeft(node.frontmatter.path, '/')}`,
      component: template,
      context: isSummit ? { slug: node.frontmatter.slug } : {}
    })
  })
}

const remoteFileType = 'RemoteFile'

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type ${remoteFileType} implements Node {
      content: String
      url: String
    }
  `
  createTypes(typeDefs)
}

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest
}) => {
  const { createNode } = actions

  const urls = [
    'https://raw.githubusercontent.com/ory/kratos-selfservice-ui-react-native/master/app.config.js',
    'https://github.com/ory/kratos-selfservice-ui-react-native/blob/master/App.tsx',
    'https://github.com/ory/kratos-selfservice-ui-react-native/blob/master/src/components/AuthProvider.tsx',
    'https://github.com/ory/kratos-selfservice-ui-react-native/blob/master/src/helpers/auth.tsx',
    'https://github.com/ory/kratos-selfservice-ui-react-native/blob/master/src/components/Navigation.tsx',
    'https://github.com/ory/kratos-selfservice-ui-react-native/blob/master/src/components/Routes/Login.tsx',
    'https://github.com/ory/kratos-selfservice-ui-react-native/blob/master/src/components/Routes/Registration.tsx',
    'https://github.com/ory/kratos-selfservice-ui-react-native/blob/master/src/components/Routes/Home.tsx',
    'https://github.com/ory/kratos-selfservice-ui-react-native/blob/master/src/components/Routes/Settings.tsx',
    'https://github.com/ory/kratos-selfservice-ui-react-native/blob/master/app.config.js',
    'https://github.com/ory/kratos-selfservice-ui-react-native/blob/master/src/helpers/sdk.tsx'
  ]

  await Promise.all(
    urls.map((url) =>
      fetch(
        url
          .replace('github.com', 'raw.githubusercontent.com')
          .replace('/blob/', '/')
      )
    )
  )
    .then((res) => Promise.all(res.map((r) => r.text())))
    .then((res) =>
      Promise.all(
        res.map((file, key) => {
          const url = urls[key]
          return createNode({
            id: createNodeId(`${remoteFileType}-${url}`),
            parent: null,
            children: [],
            content: file,
            url: url,
            internal: {
              type: remoteFileType,
              mediaType: `text/text`,
              contentDigest: createContentDigest(file)
            }
          })
        })
      )
    )
    .catch((err) => {
      console.error(err)
      return Promise.resolve()
    })
}

exports.onCreateWebpackConfig = ({
  stage,
  actions,
  getConfig,
  loaders,
  plugins
}) => {
  /* https://github.com/gatsbyjs/gatsby/discussions/30169#discussioncomment-877458 */
  // See also https://github.com/mediacurrent/gatsby-plugin-silence-css-order-warning/issues/1
  const config = getConfig()
  const miniCssExtractPluginIndex = config.plugins.findIndex(
    (plugin) => plugin.constructor.name === 'MiniCssExtractPlugin'
  )

  if (miniCssExtractPluginIndex > -1) {
    // remove miniCssExtractPlugin from plugins list
    config.plugins.splice(miniCssExtractPluginIndex, 1)

    // re-add mini-css-extract-plugin
    if (stage === 'build-javascript') {
      config.plugins.push(
        plugins.extractText({
          filename: `[name].[contenthash].css`,
          chunkFilename: `[name].[contenthash].css`,
          ignoreOrder: true
        })
      )
    } else {
      config.plugins.push(
        plugins.extractText({
          filename: `[name].css`,
          chunkFilename: `[id].css`,
          ignoreOrder: true
        })
      )
    }
  }
  actions.replaceWebpackConfig(config)
  /* end */

  actions.setWebpackConfig({
    resolve: {
      fallback: {
        stream: require.resolve('stream-browserify'),
        events: require.resolve('events'),
        buffer: require.resolve('buffer/')
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer']
      })
    ]
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  // fmImagesToRelative(node) // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
