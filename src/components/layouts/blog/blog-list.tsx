import cn from 'classnames'
import React from 'react'

import Button from '../../freestanding/button/button'
import Container from '../../freestanding/containers/container'
import Grid from '../../freestanding/containers/grid'

import { AuthorName } from './blog-author'

import {
  pb16,
  pb8
} from '../../freestanding/utils/padding.module.css'
import * as styles from './blog-list.module.css'

export interface PropTypes {
  id: string
  posts: BlogPostNode[]
}

export type BlogPostNode = {
  id: string
  frontmatter: {
    publishedAt: string
    author: string | null
    path: string | null
    title: string | null
    teaser: string | null
    overline: string | null
    subtitle: string | null
    tags?: string[] | null
    featuredimage?: {
      childImageSharp: {
        gatsbyImageData: any
      }
    } | null
    seo?: {
      title?: string | null
      description?: string | null
      keywords?: string | null
      canonical?: string | null
    } | null
  }
}

export const BlogListItem = ({ node }: { node: BlogPostNode }) => (
  <Grid
    lg={4}
    md={4}
    sm={6}
    xs={12}
    className={cn(styles.blogItem, styles.itemFlex)}
  >
    <Button style={'none'} to={node.frontmatter.path || ''}>
      <Container
        justify={'space-between'}
        alignItems={'stretch'}
        flexContainer={'column'}
      >
        <Container
          flexContainer={'column'}
          justify={'start'}
          alignItems={'start'}
          className={cn(pb16, styles.minHeight)}
        >
          <h2 className={cn('font-overline', pb16)}>
            <span className={cn('is-themed-primary')}>&gt; </span>
            {node.frontmatter.overline}
          </h2>
          <h3 className={cn('font-h5', pb8)}>{node.frontmatter.title}</h3>
        </Container>
        <Container justify={'start'} className={cn(pb16)}>
          <p className={cn('font-p-smaller')}>
            <AuthorName
              className={cn('font-p-smaller')}
              name={node.frontmatter.author || ''}
            />{' '}
            - {node.frontmatter.publishedAt}
          </p>
        </Container>
      </Container>
    </Button>
  </Grid>
)

const BlogList = ({ id, posts }: PropTypes) => {
  return (
    <Container id={id} className={cn(styles.blogList)} fluid={true} justify={'center'} alignItems={'start'}>
      <Grid lg={12} md={12} sm={12} xs={12}>
        <Container alignItems={'stretch'} justify={'start'}>
          {(posts || []).map((node) => (
            <BlogListItem key={node.id} node={node} />
          ))}
        </Container>
      </Grid>
    </Container>
  )
}

export default BlogList
