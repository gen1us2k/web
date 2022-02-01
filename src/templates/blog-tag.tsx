import { PageProps, useStaticQuery, graphql } from 'gatsby'
import React from 'react'

import FeaturedBlogPosts, { getFeaturedProps } from '../components/layouts/blog/blog-featured'
import BlogHeading from '../components/layouts/blog/blog-heading'
import BlogList, { BlogPostNode } from '../components/layouts/blog/blog-list'
import BlogTags, { addTagSlugs } from '../components/layouts/blog/blog-tags'
import Layout from '../components/layouts/layout/layout'
import Newsletter from '../components/layouts/newsletter/newsletter'
import SEO from '../components/layouts/seo/seo'

import rawJson from '../page-content/content-blog.json'

const jsonWithTagSlugs = addTagSlugs(rawJson as any);

const BlogTagPage = ({
  pageContext: {
    tagSlug,
    tagName,
    posts,
    seo: tagSeo = {}
  }
}: PageProps<
  any,
  {
    tagSlug: string
    tagName: string
    posts: BlogPostNode[]
    seo?: any
  }
>) => {
  const seo = {
    ...jsonWithTagSlugs.seo,
    ...tagSeo,
  }

  const content = { ...jsonWithTagSlugs, tags: [...jsonWithTagSlugs.tags] };
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


  blogTagPosts.allMdx.edges.forEach(({ node }: { node: BlogPostNode }) => {
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
      <SEO {...seo} />

      <FeaturedBlogPosts {...getFeaturedProps(blogTagPosts.allMdx.edges, rawJson)} />

      <Newsletter
        {...rawJson.newsletter as React.ComponentProps<typeof Newsletter>}
      />

      <BlogHeading title={tagName} />

      <BlogTags
        currentSlug={tagSlug}
        tags={content.tags}
      />

      <BlogList id={`blog.${tagSlug}.list`} posts={posts} />
    </Layout>
  )
}

export default BlogTagPage
