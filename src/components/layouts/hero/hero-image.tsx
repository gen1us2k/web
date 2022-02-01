import cn from 'classnames'
import React from 'react'

import Button from '../../freestanding/button/button'
import Container from '../../freestanding/containers/container'
import Grid from '../../freestanding/containers/grid'
import ContentVisual from '../../freestanding/content/content-visual'

import { pb32 } from '../../freestanding/utils/padding.module.css'
import * as styles from './hero-image.module.css'

export interface PropTypes {
  id: string
  title: string | React.ReactElement
  description: string | React.ReactElement
  image: React.ReactElement
  buttons?: Array<HeroCTA>
}

interface HeroCTA {
  ctaTitle: string
  style: 'filled' | 'outlined' | 'text'
  to: string
  openInNewWindow?: boolean
  iconRight?: React.ReactElement
  className?: string
}

const HeroImage = ({ title, description, buttons, image, id }: PropTypes) => (
  <div id={id} className={cn(styles.heroImage)}>
    <Container fluid={true} alignItems={'center'}>
      <Grid lg={5} md={6} sm={12} xs={12} className={cn(pb32)}>
        <Container className={cn(pb32, styles.title)}>
          <h1 className={cn('font-h1', pb32)}>{title}</h1>
          <p className={cn('font-p-large')}>{description}</p>
        </Container>
        <Container justify={'start'}>
          {buttons &&
            buttons.map(
              (
                { ctaTitle, style, to, openInNewWindow, iconRight, className },
                index
              ) => (
                <Button
                  className={cn('button-group', className)}
                  style={style}
                  key={index}
                  iconRight={iconRight}
                  openInNewWindow={openInNewWindow}
                  to={to}
                >
                  {ctaTitle}
                </Button>
              )
            )}
        </Container>
      </Grid>
      <Grid lg={6} md={6} sm={12} xs={12}>
        <ContentVisual>{image}</ContentVisual>
      </Grid>
    </Container>
  </div>
)

export default HeroImage
