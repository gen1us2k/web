import React from 'react'
import { PageProps } from 'gatsby'

import BlogList, { BlogPostNode } from '../components/layouts/blog/blog-list'
import Layout from '../components/layouts/layout/layout'
import SEO from '../components/layouts/seo/seo'
import content from '../page-content/content-blog.json'
import BlogFeatured from '../components/layouts/blog/blog-featured'

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

  const featured = (posts || []).find(({
    node: { frontmatter: { path = null } = {} } = {}
  }: any) => path === content.featured)

  return (
    <Layout>
      <SEO {...seo} />

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
