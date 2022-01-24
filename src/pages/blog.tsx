import { useStaticQuery, graphql, PageProps } from 'gatsby'
import React from 'react'

import FeaturedBlogPosts from '../components/layouts/blog/blog-featured'
import BlogHeading from '../components/layouts/blog/blog-heading'
import BlogList, { BlogPostNode } from '../components/layouts/blog/blog-list'
import BlogTags, { slugify } from '../components/layouts/blog/blog-tags'
import Layout from '../components/layouts/layout/layout'
import Newsletter from '../components/layouts/newsletter/newsletter'
import SEO from '../components/layouts/seo/seo'

import content from '../page-content/content-blog.json'

const BlogPage = () => {
  const blogPosts = useStaticQuery(graphql`
    query blogListing {
      allMdx(
        filter: {
          fileAbsolutePath: { regex: "/markdown/blog/" }
          frontmatter: { published: { ne: false } }
        }
        sort: { fields: [frontmatter___publishedAt], order: DESC }
      ) {
        edges {
          node {
            id
            excerpt(pruneLength: 250)
            frontmatter {
              featuredimage {
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
    (blogPosts?.allMdx?.edges || []).find(
      ({ node: { frontmatter: { path = null } = {} } = {} }: any) =>
        path === content.featured[wanted]
    )?.node
  return (
    <Layout>
      <SEO {...content.seo} />

      <FeaturedBlogPosts
        big={getFeatured('big')}
        top={getFeatured('top')}
        bottom={getFeatured('bottom')}
      />

      <BlogHeading title={content.title} />

      <BlogTags
        tags={content.tags.map(({ name }) => ({ name, slug: slugify(name) }))}
      />

      <BlogList
        id={content.id}
        posts={blogPosts.allMdx.edges.map(
          ({ node }: { node: BlogPostNode }) => node
        )}
      />

      <Newsletter />
    </Layout>
  )
}

export default BlogPage
