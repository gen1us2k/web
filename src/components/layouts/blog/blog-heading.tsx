import cn from 'classnames'
import * as React from 'react';

import Container from '../../freestanding/containers/container'

import * as styles from './blog-heading.module.css'

const BlogHeading = ({ title }: { title: string }) => (
  (title
    ? (
      <Container fluid={true} justify={'center'} className={styles.root}>
        <h1 className={'font-h1'}>{title}</h1>
      </Container>
    )
    : null
  )
)

export default BlogHeading