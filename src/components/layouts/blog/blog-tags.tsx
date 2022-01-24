import cn from 'classnames'
import { Link } from 'gatsby'
import React from 'react'

import Container from '../../freestanding/containers/container'

import * as styles from './blog-tags.module.css'

interface PropTypes {
  tags: ReturnType<typeof normalizeTags>
  showCount?: boolean
  currentSlug?: string
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
  ids?: string[]
}

export const slugify = (text: string) => {
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
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
    const { tags, category, seo } = node.frontmatter || {}

    const normalizedTags = (tags || []).map((tag: string) => {
      const slug = slugify(tag)

      return {
        name: tag,
        slug,
        ids: [node.id]
      }
    })

    if (category) {
      const slug = slugify(category)

      normalizedTags.push({
        name: category,
        slug,
        ids: [node.id]
      })
    }

    if (seo && seo.keywords) {
      const keywords = seo.keywords.split(',').map((keyword: string) => {
        const slug = slugify(keyword)

        return {
          name: keyword,
          slug,
          ids: [node.id]
        }
      })

      normalizedTags.push(...keywords)
    }

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

const BlogTags = ({ tags, showCount, currentSlug }: PropTypes) => {
  return (
    <Container
      component="nav"
      fluid
      justify="center"
      alignItems="center"
      className={styles.root}
      id="blog-tags"
    >
      <ul className={styles.list}>
        {[{ slug: '..', name: 'All', ids: [] }, ...sortByCount(tags)].map(
          ({ slug, name, ids: { length: count } = [] }) => (
            <li
              key={slug}
              className={cn(styles.item, {
                [styles.active]: slug === currentSlug
              })}
            >
              <Link to={`/blog/tag/${slug}#blog-tags`} className={styles.link}>
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
          )
        )}
      </ul>
    </Container>
  )
}

export default BlogTags
