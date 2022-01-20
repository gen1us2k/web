import cn from 'classnames'
import GatsbyLink from 'gatsby-link'
import React from 'react'

import { ParseCase } from '../../../util'

import { pl8, pr8 } from '../utils/padding.module.css'
import * as styles from './button.module.css'

export interface PropTypes {
  children?: React.ReactNode
  className?: string
  style:
    | 'filled'
    | 'outlined'
    | 'text'
    | 'none'
    | 'link'
    | 'footer'
    | 'navigation'
    | 'icon'
    | 'link-inline'
  to: string | (() => void)
  sideEffect?: () => void
  openInNewWindow?: boolean
  iconRight?: React.ReactElement
  iconLeft?: React.ReactElement
}

const buttonVariants = ['filled', 'outlined', 'text', 'icon']

const Button = ({
  children,
  className,
  style = 'filled',
  to,
  openInNewWindow = false,
  iconRight,
  iconLeft,
  sideEffect
}: PropTypes) => {
  const getStyle = (style: string): string => {
    // @ts-ignore
    return styles[`style${ParseCase(style)}`]
  }

  const classes = cn(className, {
    [getStyle(style)]: style !== 'none',
    'font-link': style === 'link',
    'font-p-smaller': style === 'footer',
    'font-nav': style === 'navigation',
    'font-button': buttonVariants.includes(style),
    [styles.btnBase]: buttonVariants.includes(style) || style === 'link'
  })

  const content = (
    <>
      {iconLeft && (
        <span className={cn(pr8, styles.btnTextContainer)}>{iconLeft}</span>
      )}
      <span className={cn(styles.btnTextContainer)}>{children}</span>
      {iconRight && (
        <span className={cn(pl8, styles.btnTextContainer)}>{iconRight}</span>
      )}
    </>
  )

  if (typeof to === 'string') {
    return to.startsWith('/') &&
      to.indexOf('/docs') < 0 &&
      to.indexOf('/summit21') < 0 ? (
      <GatsbyLink
        to={to}
        className={classes}
        rel={openInNewWindow ? 'noopener noreferrer' : ''}
        target={openInNewWindow ? '_blank' : ''}
        onClick={sideEffect}
      >
        {content}
      </GatsbyLink>
    ) : (
      <a
        href={to}
        className={classes}
        rel={openInNewWindow ? 'noopener noreferrer' : ''}
        target={openInNewWindow ? '_blank' : ''}
        onClick={sideEffect}
      >
        {content}
      </a>
    )
  } else {
    return (
      <a
        className={classes}
        onClick={() => {
          to()
          if (sideEffect) {
            sideEffect()
          }
        }}
      >
        {content}
      </a>
    )
  }
}

export default Button
