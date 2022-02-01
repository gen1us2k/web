import React from 'react'

import PreviewLayout from '../PreviewLayout'
import FeaturedBlogPosts, { BlogFeaturedProps } from '../../components/layouts/blog/blog-featured'
import ErrorBoundary from '../../components/freestanding/error-boundary/ErrorBoundary'
import Newsletter from '../../components/layouts/newsletter/newsletter'

const prepareFeatured = (entry: any, fieldsMetaData: any): BlogFeaturedProps => {
  return JSON.parse(JSON.stringify({
    title: entry
      .getIn(['data', 'featured', 'title']),
    big: {
      frontmatter: fieldsMetaData
      .getIn(['featured', 'big', 'blogpost', entry
      .getIn(['data', 'featured', 'big'])]) as BlogFeaturedProps['big']['frontmatter'],
    },
    top: {
      frontmatter: fieldsMetaData
      .getIn(['featured', 'top', 'blogpost', entry
      .getIn(['data', 'featured', 'top'])]) as BlogFeaturedProps['top']['frontmatter'],
    },
    bottom: {
      frontmatter: fieldsMetaData
      .getIn(['featured', 'bottom', 'blogpost', entry
      .getIn(['data', 'featured', 'bottom'])]) as BlogFeaturedProps['bottom']['frontmatter'],
    },
  }))
}

const BlogPreview = (props: any) => {
  const { entry, fieldsMetaData } = props

  const { data: { newsletter } } = entry.toJSON()

  const featured = prepareFeatured(entry, fieldsMetaData);
  
  const title = entry.getIn(['data', 'title'])
  const description = entry.getIn(['data', 'description'])

  return (
    <PreviewLayout>
      <ErrorBoundary>
        <FeaturedBlogPosts {...featured} />

        <Newsletter {...newsletter} />
      </ErrorBoundary>
    </PreviewLayout>
  )
}

export default BlogPreview
