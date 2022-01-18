import * as React from 'react'
import cn from 'classnames';
import { getSrc } from "gatsby-plugin-image"

import Container from '../../freestanding/containers/container'
import Button from '../../freestanding/button/button';
import { AuthorNameUnion } from './blog-author';
import * as styles from './blog-featured.module.css';

export interface BlogFeaturedProps {
  frontmatter: {
    path: string;
    title: string;
    author: AuthorNameUnion;
    publishedAt: string;
    teaser: string;
    overline: string;
    featuredimage?: {
      childImageSharp: {
        gatsbyImageData: any;
      }
    } | null
    seo?: {
      title?: string | null
      description?: string | null
      keywords?: string | null
      canonical?: string | null
    } | null
  };
  excerpt: string;
}

const BlogFeatured = ({
    excerpt,
    frontmatter,
  }: BlogFeaturedProps) => {
  if (!frontmatter) return null

  const {
    path,
    title,
    author,
    publishedAt,
    teaser,
    overline,
    featuredimage
  } = frontmatter;
  const image = featuredimage && getSrc(featuredimage.childImageSharp.gatsbyImageData);
  return (
    <Container
      fluid
      justify="center"
      alignItems="start"
      component="article"
      className={styles.root}
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className={styles.inner}>
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

          <div className={styles.metaTeaser}>{teaser}</div>
        </div>

        <p className={styles.excerpt}>{excerpt}</p>

        <div className={styles.readMore}>
          <Button className={styles.readMoreButton} style="link-inline" to={path}>
            Read More
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default BlogFeatured;
