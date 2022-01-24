import React from 'react'
import PropTypes from 'prop-types'
import { Location } from '@reach/router'

import 'prismjs'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-pug'
import 'prismjs/components/prism-shell-session'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-yaml'

import '../../gatsby-browser'
import Layout from '../components/layouts/layout/layout'

const PreviewLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Location>
      {() => (
        <Layout>
          {children}
        </Layout>
      )}
    </Location>
  )
}

export default PreviewLayout
