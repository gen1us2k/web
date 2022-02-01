import PropTypes from 'prop-types'
import React from 'react'
import { Location } from '@reach/router'

import '../previewGlobalDeps'
import Footer from '../../components/layouts/footer/footer'
import Container from '../../components/freestanding/containers/container'
import * as layoutStyles from '../../components/layouts/layout/layout.module.css'
import oryLogoWhite from '../../images/logo/logo-ory-white.svg'

const FooterPreview = ({ entry }: any) => {
  const { data } = entry.toJSON();
  console.info('data', data)
  return (
    <Location>{() => (
      <div className={layoutStyles.layout}>
        <main>
          <Container fluid>
            <details>
              <summary>JSON</summary>
              <pre>{JSON.stringify(data, null, 2)}</pre>
            </details>
          </Container>
        </main>
        <Footer
          logo={oryLogoWhite}
          {...data}
        />
      </div>
    )}</Location>
  )
}

FooterPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default FooterPreview
