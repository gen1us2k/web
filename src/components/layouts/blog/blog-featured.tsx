import cn from 'classnames'
import { getSrcSet } from 'gatsby-plugin-image'
import * as React from 'react'

import Button from '../../freestanding/button/button'
import Container from '../../freestanding/containers/container'

import { AuthorName } from './blog-author'
import type { BlogPostNode } from './blog-list'

import * as styles from './blog-featured.module.css'
import BlogHeading from './blog-heading'

export interface BlogFeaturedProps {
  title: string
  big: BlogPostNode
  top: BlogPostNode
  bottom: BlogPostNode
}

export interface FeaturedJson {
  title: string
  big: string
  top: string
  bottom: string
}

const makeGetFeaturedBlogPost = (blogPosts: { node: BlogPostNode }[], rawJson: { featured: FeaturedJson }) => (wanted: keyof typeof rawJson.featured) =>
  blogPosts.find(
    ({ node: { frontmatter: { path = null } = {} } = {} }: any) =>
      path === rawJson.featured[wanted]
  )?.node

export const getFeaturedProps = (edges: { node: BlogPostNode }[], rawJson: { featured: FeaturedJson }): BlogFeaturedProps => {
  const getFeatured = makeGetFeaturedBlogPost(edges, rawJson)

  return {
    title: rawJson.featured.title,
    big: getFeatured('big') as BlogPostNode,
    top: getFeatured('top') as BlogPostNode,
    bottom: getFeatured('bottom') as BlogPostNode,
  };
}

const Base = ({
  overline,
  title,
  author,
  publishedAt,
  teaser,
  path,
  featuredimage,
  big
}: BlogPostNode['frontmatter'] & {
  big?: boolean
}) => {
  const image =
    featuredimage && getSrcSet(featuredimage.childImageSharp.gatsbyImageData)
  return (
    <article
      className={cn(styles.article, {
        [styles.big]: big
      })}
    >
      <svg
        className={styles.svgDeco}
        width="108"
        height="48"
        viewBox="0 0 108 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M54 -2.36041e-06L108 25.732L108 48L54 22.268L0 48L-9.73367e-07 25.732L54 -2.36041e-06Z" />
        <path d="M54 48L-8.60276e-06 22.268L-7.62939e-06 -4.72083e-06L54 25.732L108 0L108 22.268L54 48Z" />
      </svg>

      {big && image && (
        <img alt="Illustration" className={styles.image} srcSet={image} />
      )}

      <h2 className={cn(styles.overline, 'font-overline')}>
        <span className="is-themed-primary">&gt; </span>
        {overline}
      </h2>

      <h3 className={cn(styles.title, 'font-h2')}>{title}</h3>

      <p className={cn('font-p-smaller')}>
        <AuthorName className={cn('font-p-smaller')} name={author || ''} /> -{' '}
        {publishedAt}
      </p>

      <div className={styles.teaser}>{teaser}</div>

      <div className={styles.readMore}>
        <Button
          className={styles.readMoreButton}
          style="link-inline"
          to={path || ''}
        >
          Read More
        </Button>
      </div>
    </article>
  )
}

const FeaturedBlogPosts = ({
  title,
  big: { frontmatter: big },
  top: { frontmatter: top },
  bottom: { frontmatter: bottom }
}: BlogFeaturedProps) => {
  return (
    <>
      <BlogHeading title={title} />

      <Container fluid className={styles.root}>
        <Base {...big} big />

        <div className={styles.side}>
          <Base {...top} />
          <Base {...bottom} />
        </div>
      </Container>
    </>
  )
}

export default FeaturedBlogPosts
