import React from 'react'
import { PageProps, useStaticQuery, graphql } from 'gatsby'

import BlogList, { BlogPostNode } from '../components/layouts/blog/blog-list'
import Layout from '../components/layouts/layout/layout'
import SEO from '../components/layouts/seo/seo'
import content from '../page-content/content-blog.json'
import FeaturedBlogPosts from '../components/layouts/blog/blog-featured'

const BlogTagPage = ({
  pageContext: {
    tagSlug,
    tagName,
    posts
  }
}: PageProps<any, {
  tagSlug: string
  tagName: string
  posts: BlogPostNode[],
}>) => {
  const seo = {
    ...content.seo,
    ...((content.tags.find(({ name }) => tagName === name) || { seo: {} }).seo || {})
  };

  const blogTagPosts = useStaticQuery(graphql`
  query blogTagListing{
    allMdx(
      filter: {
        fileAbsolutePath: { regex: "/markdown\/blog/" }
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

  const getFeatured = (wanted: keyof typeof content.featured) => (blogTagPosts?.allMdx?.edges || []).find(({
    node: { frontmatter: { path = null } = {} } = {}
  }: any) => path === content.featured[wanted])?.node

  return (
    <Layout>
      <SEO {...seo} />
      
      <FeaturedBlogPosts
        big={getFeatured('big')}
        top={getFeatured('top')}
        bottom={getFeatured('bottom')}
      />

      {featured?.frontmatter?.featuredimage && <BlogFeatured {...featured} />}
    
      <BlogList
        id={`blog.${tagName}.list`}
        title={tagName}
        posts={posts}
      />
    </Layout>
  );
}

export default BlogTagPage
