import cn from 'classnames'
import React from 'react'

import Button from '../../freestanding/button/button'
import Container from '../../freestanding/containers/container'
import Grid from '../../freestanding/containers/grid'

import {
  pb16,
  pb24,
  pb32,
  pb64
} from '../../freestanding/utils/padding.module.css'
import * as styles from './coding.module.css'

export interface CodingContent {
  icon: React.ReactElement
  title: React.ReactElement
  description: React.ReactElement
  button: React.ReactElement
}

export interface PropTypes {
  id: string
  background?: 'dark' | 'grey' | 'light-grey' | 'themed'
  slant?: boolean
  overline: string
  title: React.ReactElement
  description: React.ReactElement
  additional?: Additional
  button?: CodingCTA
  codebox: React.ReactNode
  content?: Array<CodingContent>
}

interface Additional {
  title: string | React.ReactElement
  description: string | React.ReactElement
  button?: CodingCTA
}

interface CodingCTA {
  ctaTitle: string
  to: string
  iconRight?: React.ReactElement
  openInNewWindow?: boolean
  className?: string
}

const ArrowRight = <i className="ph-arrow-right-bold size16" />

const Coding = ({
  id,
  slant,
  background,
  title,
  overline,
  description,
  additional,
  codebox,
  button
}: PropTypes) => (
  <div
    id={id}
    className={cn(
      styles.coding,
      {
        ['background-is-grey']: background === 'grey',
        ['background-is-dark']: background === 'dark',
        ['background-is-light-grey']: background === 'light-grey',
        ['background-is-themed']: background === 'themed'
      },
      { ['is-slanted-top-larger']: slant === true }
    )}
  >
    <Container fluid={true} alignItems={'center'}>
      <Grid className={pb32} lg={4} md={5} sm={12} xs={12}>
        <div className={additional && pb64}>
          <h1 className={cn('font-overline', pb24)}>
            <span className={'is-themed-primary'}>&gt; </span>
            {overline}
          </h1>
          <h2 className={cn('font-h2', pb32)}>{title}</h2>
          <p className={cn('font-p-large', pb24)}>{description}</p>
          {button && (
            <Container>
              <Button
                className={cn(button.className && button.className)}
                style={'link'}
                iconRight={button.iconRight}
                openInNewWindow={button.openInNewWindow}
                to={button.to}
              >
                {button.ctaTitle}
              </Button>
            </Container>
          )}
        </div>
        {additional && (
          <>
            <h3 className={cn('font-h3', pb16)}>{additional.title}</h3>
            <p className={cn('font-p-large', pb24)}>{additional.description}</p>
            {additional.button && (
              <Container>
                <Button
                  className={cn(
                    additional.button.className && additional.button.className
                  )}
                  style={'link'}
                  iconRight={additional.button.iconRight}
                  openInNewWindow={additional.button.openInNewWindow}
                  to={additional.button.to}
                >
                  {additional.button.ctaTitle}
                </Button>
              </Container>
            )}
          </>
        )}
      </Grid>
      <Grid lg={6} md={7} sm={12} xs={12} className={styles.codeboxContainer}>
        <Container className={styles.codeboxWrapper}>{codebox}</Container>
      </Grid>
    </Container>
  </div>
)

export default Coding
