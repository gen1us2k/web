import cn from 'classnames'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-pug'
import 'prismjs/components/prism-shell-session'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-yaml'
import React, { useEffect } from 'react'
import Helmet from 'react-helmet'

import footer from '../../../page-content/navigation/footer.json'
import { sideNav } from '../../../page-content/navigation/navigation-header'
import nav from '../../../page-content/navigation/header.json'
import Footer from '../footer/footer'
import Navigation from '../navigation/navigation'
import EventLayout from '../summit/event-layout'

import * as styles from './layout.module.css'

import oryLogoPrimary from '../../../images/logo/logo-ory-primary.svg'
import oryLogoWhite from '../../../images/logo/logo-ory-white.svg'

interface PropTypes {
  isEvent?: boolean
  theme?: string
  children?: React.ReactNode
}

const Layout = ({ children, theme, isEvent }: PropTypes) => {
  return (
    <div className={cn(styles.layout)}>
      <Navigation
        logo={oryLogoPrimary}
        {...sideNav}
        {...nav}
      />
      <main
        className={cn(
          theme ? `theme-${theme}` : '',
          isEvent && styles.summitContainer
        )}
      >
        {isEvent ? <EventLayout>{children}</EventLayout> : children}
      </main>
      <Footer
        logo={oryLogoWhite}
        {...footer}
      />
    </div>
  )
}

export default Layout
