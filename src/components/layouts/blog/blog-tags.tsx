import cn from 'classnames'
import { Link } from 'gatsby'
import React from 'react'

import Container from '../../freestanding/containers/container'
import type { BlogPostNode } from './blog-list'
import type { BlogContext } from '../../../pages/blog'

import * as styles from './blog-tags.module.css'

export interface PropTypes {
  tags: Tag[]
  showCount?: boolean
  currentSlug?: string
  allLabel?: string
}

export interface QueryTag {
  node: {
    id: string
    frontmatter: {
      tags: string[] | null
      category: string | null
      seo: {
        keywords: string
      } | null
    }
  }
}

export interface Tag {
  name: string
  slug: string
  description?: string
  ids?: string[]
  seo?: {
    title?: string
    description?: string
    keywords?: string
  }
}

export const slugify = (text: string) => {
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
}

export const addTagSlugs = (rawJson: { tags: Tag[], [k: string]: any }) => ({
  ...rawJson,
  tags: rawJson.tags.map((original) => ({
    seo: {},
    posts: [],
    ids: [],
    ...original,
    slug: slugify(original.name),
  })),
} as unknown as BlogContext)

export const findTagBySlug = (tags: Tag[], slug: string) => {
  return tags.find(tag => tag.slug === slug)
}

export const findIndexBySlug = (slug: string, tags: Tag[]) => {
  return tags.findIndex((tag) => tag.slug === slug)
}

export const sortByCount = (tags: Tag[]) => {
  return tags.sort((a, b) => (b.ids || []).length - (a.ids || []).length)
}

export const sortByName = (tags: Tag[]) => {
  return tags.sort((a, b) => a.name.localeCompare(b.name))
}

export const normalizeTags = (raw: QueryTag[]): Tag[] => {
  return raw.reduce((acc, { node }) => {
    const { tags } = node.frontmatter || {}

    const normalizedTags = (tags || []).map((tag: string) => {
      const slug = slugify(tag)

      return {
        name: tag,
        slug,
        ids: [node.id]
      }
    })

    ;(normalizedTags || []).forEach((tag) => {
      const index = findIndexBySlug(tag.name, acc)

      if (index === -1) {
        acc.push(tag)
      } else {
        acc[index].ids?.push(node.id)
      }
    })
    return acc
  }, [] as Tag[])
}

export const extractBlogPostTags = (post: BlogPostNode): Tag[] => {
  const { tags } = post.frontmatter || {}

  const normalizedTags = (tags || []).map((tag: string) => {
    const slug = slugify(tag)

    return {
      name: tag,
      slug
    }
  })

  return normalizedTags
}

const BlogTags = ({
  tags,
  showCount,
  currentSlug,
  allLabel = 'All',
}: PropTypes) => {
  return (
    <Container
      component="nav"
      fluid
      justify="center"
      alignItems="center"
      className={styles.root}
    >
      <ul className={styles.list}>
        <li
          className={cn(styles.item, {
            [styles.active]: !currentSlug
          })}
        >
          <Link to={`/blog/#_`} className={styles.link}>
            <span className={styles.name}>{allLabel}</span>
          </Link>
        </li>

        {tags.map(
          ({ slug, name, ids: { length: count } = [] }) => (count ? (
            <li
              key={slug}
              className={cn(styles.item, {
                [styles.active]: slug === currentSlug
              })}
            >
              <Link to={`/blog/tag/${slug}#_`} className={styles.link}>
                <span className={styles.name}>{name}</span>
                <>
                  {showCount && (
                    <>
                      {' '}
                      <span className={styles.count}>{count}</span>
                    </>
                  )}
                </>
              </Link>
            </li>
          ) : null)
        ).filter(Boolean)}
      </ul>
    </Container>
  )
}

export default BlogTags
