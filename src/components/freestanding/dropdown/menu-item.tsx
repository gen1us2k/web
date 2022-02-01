import cn from 'classnames'
import React from 'react'

import Button from '../button/button'

import { menuItem, menuButton } from './menu-item.module.css'

interface PropType {
  title: string | React.ReactElement
  children?: React.ReactElement
  dotted?: boolean
  className?: string
  onClick: string | (() => void)
}

const MenuItem = ({ className, title, dotted, onClick, children }: PropType) => (
  <div>
    <li aria-haspopup="true" className={cn(menuItem, className && className)}>
      {typeof title === 'string' ? (
        <>
          <Button to={onClick} className={cn(menuButton)} style={'navigation'}>
            {title}
          </Button>

          {children}
        </>
      ) : (
        <div onClick={typeof onClick === 'function' ? onClick : () => {}}>{title}</div>
      )}
      {dotted ? (<span className={cn('dot')} />) : null}
    </li>
  </div>
)

export default MenuItem
