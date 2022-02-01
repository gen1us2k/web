import React from 'react'
import { Location } from '@reach/router'

import './previewGlobalDeps'
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
