import React from 'react'

import Button from '../../components/freestanding/button/button'
import { PropTypes as NavProps } from '../../components/layouts/navigation/navigation'

export const sideNav: Pick<NavProps, 'sideNav'> = {
  sideNav: [
    <Button
      to={'https://console.ory.sh/login'}
      style={'outlined'}
      openInNewWindow={false}
    >
      Login
    </Button>,
    <Button
      to={'https://console.ory.sh/registration'}
      style={'filled'}
      openInNewWindow={false}
    >
      Try Free
    </Button>
  ]
}
