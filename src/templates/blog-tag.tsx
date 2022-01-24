import { PageProps, useStaticQuery, graphql } from 'gatsby'
import React from 'react'

import FeaturedBlogPosts from '../components/layouts/blog/blog-featured'
import BlogHeading from '../components/layouts/blog/blog-heading'
import BlogList, { BlogPostNode } from '../components/layouts/blog/blog-list'
import BlogTags, { findTagBySlug, slugify } from '../components/layouts/blog/blog-tags'
import Layout from '../components/layouts/layout/layout'
import Newsletter from '../components/layouts/newsletter/newsletter'
import SEO from '../components/layouts/seo/seo'

import content from '../page-content/content-blog.json'

const BlogTagPage = ({
  pageContext: { tagSlug, tagName, posts }
}: PageProps<
  any,
  {
    tagSlug: string
    tagName: string
    posts: BlogPostNode[]
  }
>) => {
  const seo = {
    ...content.seo,
    ...((content.tags.find(({ name }) => tagName === name) || { seo: {} })
      .seo || {})
  }

  const blogTagPosts = useStaticQuery(graphql`
    query blogTagListing {
      allMdx(
        filter: {
          fileAbsolutePath: { regex: "/markdown/blog/" }
          frontmatter: { published: { ne: false } }
        }
      ) {
        edges {
          node {
            id
            excerpt(pruneLength: 250)
            frontmatter {
              featuredimage {
                id
                publicURL
                childImageSharp {
                  gatsbyImageData
                }
              }
              path
              seo {
                title
                description
                keywords
              }
              tags
              category
              publishedAt(formatString: "MMMM DD, YYYY")
              author
              path
              title
              teaser
              overline
            }
          }
        }
      }
    }
  `)

  const getFeatured = (wanted: keyof typeof content.featured) =>
    (blogTagPosts?.allMdx?.edges || []).find(
      ({ node: { frontmatter: { path = null } = {} } = {} }: any) =>
        path === content.featured[wanted]
    )?.node

  const tag = findTagBySlug((content.tags || []).map((t) => ({
    ...t,
    slug: slugify(t.name)
  })), tagSlug)

  return (
    <Layout>
      <SEO {...seo} />

      <FeaturedBlogPosts
        big={getFeatured('big')}
        top={getFeatured('top')}
        bottom={getFeatured('bottom')}
      />

      <BlogHeading title={tag?.name || ''} />

      <BlogTags
        currentSlug={tagSlug}
        tags={content.tags.map(({ name }) => ({ name, slug: slugify(name) }))}
      />

      <BlogList id={`blog.${tagSlug}.list`} posts={posts} />

      <Newsletter />
    </Layout>
  )
}

export default BlogTagPage
