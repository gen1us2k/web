import React from 'react'
import PropTypes from 'prop-types'
import { Location } from '@reach/router'

import 'prismjs'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-pug'
import 'prismjs/components/prism-shell-session'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-yaml'

import '../../../gatsby-browser'

import { PlainBlogTemplate } from '../../templates/blog'

const BlogPostPreview = ({ entry, widgetFor }: any) => {
  const tags = entry.getIn(['data', 'tags'])
  const author = entry.getIn(['data', 'author']);
  const title = entry.getIn(['data', 'title']);
  const overline = entry.getIn(['data', 'overline']);
  const subtitle = entry.getIn(['data', 'subtitle']);
  const publishedAt = entry.getIn(['data', 'publishedAt']);
  const description = entry.getIn(['data', 'description']);
  return (
    <Location>
      {() => (
        <PlainBlogTemplate
          frontmatter={{
            description, 
            title,
            overline,
            subtitle,
            publishedAt,
            author,
            seo: { title, keywords: (tags || []).join(', ') }
          }}
        >{widgetFor('body')}</PlainBlogTemplate>
      )}
    </Location>
  )
}

BlogPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default BlogPostPreview
