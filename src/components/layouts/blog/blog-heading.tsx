import cn from 'classnames'
import * as React from 'react';

import Container from '../../freestanding/containers/container'
import Grid from '../../freestanding/containers/grid'
import { pb64 } from '../../freestanding/utils/padding.module.css'

const BlogHeading = ({ title }: { title: string }) => (
  <Container fluid={true} justify={'center'}>
    <Grid
      lg={8}
      md={10}
      sm={12}
      xs={12}
      className={cn('text-is-centered', pb64)}
    >
      <h1 className={'font-h1'}>{title}</h1>
    </Grid>
  </Container>
)

export default BlogHeading