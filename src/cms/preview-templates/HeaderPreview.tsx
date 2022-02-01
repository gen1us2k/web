import PropTypes from 'prop-types'
import React from 'react'
import { Location } from '@reach/router'

import '../previewGlobalDeps'
import Navigation from '../../components/layouts/navigation/navigation'
import { sideNav } from '../../page-content/navigation/navigation-header'
import Container from '../../components/freestanding/containers/container'
import * as layoutStyles from '../../components/layouts/layout/layout.module.css'
import oryLogoPrimary from '../../images/logo/logo-ory-primary.svg'

const HeaderPreview = ({ entry }: any) => {
  const { data } = entry.toJSON();
  console.info('data', data)
  return (
    <Location>{() => (
      <div className={layoutStyles.layout}>
        <Navigation
          sideNav={sideNav.sideNav}
          dropdownMenu={data.dropdownMenu}
          mobileMenu={data.mobileMenu}
          logo={oryLogoPrimary}
        />
        <main>
          <Container fluid>
            <details>
              <summary>JSON</summary>
              <pre>{JSON.stringify(data, null, 2)}</pre>
            </details>
          </Container>
        </main>
      </div>
    )}</Location>
  )
}

HeaderPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default HeaderPreview
