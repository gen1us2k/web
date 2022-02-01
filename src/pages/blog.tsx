import { useStaticQuery, graphql, PageProps } from 'gatsby'
import React from 'react'

import FeaturedBlogPosts, { getFeaturedProps } from '../components/layouts/blog/blog-featured'
import BlogHeading from '../components/layouts/blog/blog-heading'
import BlogList, { BlogPostNode } from '../components/layouts/blog/blog-list'
import BlogTags, { addTagSlugs } from '../components/layouts/blog/blog-tags'
import Layout from '../components/layouts/layout/layout'
import Newsletter from '../components/layouts/newsletter/newsletter'
import SEO from '../components/layouts/seo/seo'

import rawJson from '../page-content/content-blog.json'

export interface BlogContext {
  id: string
  title: string
  featured: {
    title: string
    big: string
    top: string
    bottom: string
  }
  seo: {
    title: string
    description: string
  }
  tags: {
    name: string
    slug: string
    posts: BlogPostNode[]
    ids: string[]
    seo?: any
  }[]
  authors: {
    name: string
    fullname: string
    url: string
  }[]
}

const jsonWithTagSlugs = addTagSlugs(rawJson as any)

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

  const content = { ...jsonWithTagSlugs, tags: [...jsonWithTagSlugs.tags] };
  blogPosts.allMdx.edges.forEach(({ node }: { node: BlogPostNode }) => {
    const postTags = node.frontmatter.tags || [];
    content.tags.forEach((tag) => {
      if (postTags.includes(tag.name) && !tag.ids.includes(node.id)) {
        tag.posts.push(node)
        tag.ids.push(node.id)
      }
    })
  })

  return (
    <Layout>
      <SEO {...content.seo} />

      <FeaturedBlogPosts {...getFeaturedProps(blogPosts.allMdx.edges, rawJson)} />

      <Newsletter
        {...rawJson.newsletter as React.ComponentProps<typeof Newsletter>}
      />

      <BlogHeading title={content.title} />

      <BlogTags tags={content.tags} />

      <BlogList
        id={content.id}
        posts={blogPosts.allMdx.edges.map(
          ({ node }: { node: BlogPostNode }) => node
        )}
      />
    </Layout>
  )
}

export default BlogPage
