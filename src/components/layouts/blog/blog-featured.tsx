import * as React from 'react'
import cn from 'classnames';
import { getSrcSet } from "gatsby-plugin-image"

import Container from '../../freestanding/containers/container'
import Button from '../../freestanding/button/button';
import * as styles from './blog-featured.module.css';
import type { BlogPostNode } from './blog-list';

export interface BlogFeaturedProps {
  big: BlogPostNode
  top: BlogPostNode
  bottom: BlogPostNode
}

const Base = ({
  overline,
  title,
  author,
  publishedAt,
  teaser,
  path,
  featuredimage,
  big,
}: BlogPostNode["frontmatter"] & {
  big?: boolean
}) => {
  const image = featuredimage && getSrcSet(featuredimage.childImageSharp.gatsbyImageData);
  return (
    <article
      className={cn(styles.article, {
        [styles.big]: big,
      })}
    >
      {big && image && (
        <img
          alt="Illustration"
          className={styles.image}
          srcSet={image}
        />
      )}

      <h2 className={cn(styles.overline, 'font-overline')}>
        <span className="is-themed-primary">&gt; </span>
        {overline}
      </h2>

      <h3 className={cn(styles.title, 'font-h2')}>{title}</h3>

      <div className={styles.meta}>
        <div className={styles.metaAuthor}>
          <span className={styles.metaAuthorName}>{author}</span>
          -
          <span className={styles.metaAuthorDate}>{publishedAt}</span>
        </div>
      </div>

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
  big:{
    frontmatter: big,
  },
  top:{
    frontmatter: top,
  },
  bottom:{
    frontmatter: bottom,
  },
}: BlogFeaturedProps) => {
  return (
    <Container
      fluid
      className={styles.root}
    >
      <Base {...big} big />

      <div className={styles.side}>
        <Base {...top} />
        <Base {...bottom} />
      </div>
    </Container>
  );
};

export default FeaturedBlogPosts;
