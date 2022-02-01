import cn from 'classnames'
import React from 'react'

import Button from '../../freestanding/button/button'
import Container from '../../freestanding/containers/container'
import Grid from '../../freestanding/containers/grid'

import { pb32 } from '../../freestanding/utils/padding.module.css'
import * as styles from './hero.module.css'

export interface PropTypes {
  id: string
  title: string | React.ReactElement
  description: string | React.ReactElement
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

const Hero = ({ id, title, description, buttons }: PropTypes) => (
  <div id={id} className={cn(styles.hero)}>
    <Container
      fluid={true}
      flexContainer={'column'}
      alignItems={'center'}
      justify={'center'}
    >
      <Grid lg={6} md={6} sm={12} xs={12} className={cn(pb32)}>
        <Container className={cn('text-is-centered', pb32)}>
          <h1 className={cn('font-display', pb32, styles.title)}>{title}</h1>
          <p className={cn('font-p-display', pb32)}>{description}</p>
        </Container>
        <Container justify={'center'}>
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
    </Container>
  </div>
)

export default Hero
