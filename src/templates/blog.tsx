import cn from 'classnames'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React from 'react'

import MDXBody from '../components/layouts/MDXbody/mdx-body'
import BlogHero from '../components/layouts/blog/blog-hero'
import Layout from '../components/layouts/layout/layout'
import Newsletter from '../components/layouts/newsletter/newsletter'
import SEO from '../components/layouts/seo/seo'

import { pb32 } from '../components/freestanding/utils/padding.module.css'

export interface PlainBlogTemplateProps {
  children: React.ReactNode
  frontmatter: {
    seo?: {
      title?: string
      description?: string
      keywords?: string
      canonical?: string
    }
    overline: string
    title: string
    subtitle: string
    publishedAt: string
    author: string
    description?: string
  }
}

export function PlainBlogTemplate(props: PlainBlogTemplateProps) {
  const { children, frontmatter: fn } = props
  return (
    <Layout>
      <SEO
        description={fn.seo?.description || fn.description}
        title={fn.seo?.title || fn.title}
        keywords={fn.seo?.keywords || ''}
        canonical={fn.seo?.canonical}
      />
      <BlogHero
        title={fn.title}
        overline={fn.overline}
        date={fn.publishedAt}
        author={fn.author}
        subtitle={fn.subtitle}
      />
      <MDXBody padded={false}>{children}</MDXBody>
      <Newsletter
        background={'themed'}
        special={
          <>
            <h3 className={cn('font-h3', pb32)}>Never miss an article</h3>
            <p className={cn('font-p', pb32)}>
              Ory ships regular product patches and updates. Subscribe to our
              newsletter to get the good stuff, and stay up to date.
            </p>
          </>
        }
      />
    </Layout>
  )
}

export default function BlogTemplate(props: any) {
  const { mdx } = props.data // data.mdx holds our post data
  const { body = null, frontmatter = {} } = mdx || {}
  return (
    <PlainBlogTemplate frontmatter={frontmatter}>
      {body && <MDXRenderer>{body}</MDXRenderer>}
    </PlainBlogTemplate>
  )
}

export const pageQuery = graphql`
  query ($path: String!) {
    mdx(frontmatter: { path: { eq: $path } }) {
      body
      frontmatter {
        path
        title
        author
        overline
        subtitle
        seo {
          title
          description
          keywords
          canonical
        }
        publishedAt(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
