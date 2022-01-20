import React from 'react'
import { useStaticQuery, graphql, PageProps } from 'gatsby'

import BlogList, { BlogPostNode } from '../components/layouts/blog/blog-list'
import Layout from '../components/layouts/layout/layout'
import SEO from '../components/layouts/seo/seo'
import content from '../page-content/content-blog.json'
import BlogFeatured from '../components/layouts/blog/blog-featured'
import BlogTags, { slugify } from '../components/layouts/blog/blog-tags'

const BlogPage = () => {
  const blogPosts = useStaticQuery(graphql`
  query blogListing{
    allMdx(
      filter: {
        fileAbsolutePath: { regex: "/markdown\/blog/" }
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

  const featured = (blogPosts?.allMdx?.edges || []).find(({
    node: { frontmatter: { path = null } = {} } = {}
  }: any) => path === content.featured)

  return (
    <Layout>
      <SEO {...content.seo} />

      {featured?.node?.frontmatter?.featuredimage && <BlogFeatured {...featured.node} />}

      <BlogTags
        tags={content.tags.map(({ name }) => ({ name, slug: slugify(name) }))}
      />

      <BlogList
        id={content.id}
        title={content.title}
        posts={blogPosts.allMdx.edges.map(({ node }: { node: BlogPostNode }) => node)}
      />
    </Layout>
  );
}

export default BlogPage
