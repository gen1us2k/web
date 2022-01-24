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

export const dropdownMenu: Pick<NavProps, 'dropdownMenu'> = {
  dropdownMenu: [
    {
      title: 'Products',
      mainMenu: [
        {
          title: 'Ory Cloud',
          description: 'Start Free, No Credit Card required',
          to: '/cloud'
        },
        {
          title: 'Pricing',
          description: 'Ory Cloud Pricing',
          to: '/pricing'
        }
      ]
    },
    {
      title: 'Solutions',
      mainMenu: [
        {
          title: 'Ory Open Source',
          description: "Ory builds free and open software",
          to: '/open-source'
        },
        {
          title: 'Identity & User Management',
          description: 'Ory Kratos',
          to: '/kratos'
        },
        {
          title: 'OAuth 2.0 & OpenIDConnect',
          description: 'Ory Hydra',
          to: '/hydra'
        },
        {
          title: 'Global Authorization Server',
          description: 'Ory Keto',
          to: '/keto'
        },
        {
          title: 'Zero Trust Networking',
          description: 'Ory Oathkeeper',
          to: '/oathkeeper'
        },
        {
          title: 'Community Driven Development',
          description: 'GitHub',
          to: 'https://github.com/ory',
          openInNewWindow: true
        }
      ]
    },
    {
      title: 'Developers',
      mainMenu: [
        {
          title: 'Documentation',
          description: 'Documentation for all Ory products',
          to: '/docs'
        },
        {
          title: 'Community',
          description: 'Be part of the Ory Community',
          to: '/community'
        },
        {
          title: 'Articles & Guides',
          description: 'Ory Developer Blog',
          to: '/blog'
        },
        {
          title: 'NextJS',
          description: 'Painless Authentication for React',
          to: '/nextjs'
        },
        {
          title: 'Talks & Presentations',
          description: 'Watch VODs of Ory Summit 21',
          to: '/summit/2021'
        }
      ]
    },
    {
      title: 'Company',
      mainMenu: [
        {
          title: 'About Us',
          to: '/about'
        },
        {
          title: 'Contact Us',
          to: 'mailto:office@ory.sh'
        },
        {
          title: 'Identity Report',
          to: '/identity-in-modern-applications-oreilly'
        }
      ]
    },
    {
      title: (
        <Button to={'/jobs'} style={'link'}>
          Jobs
          <span className={'dot'} />
        </Button>
      )
    }
  ]
}

export const mobileMenu: Pick<NavProps, 'mobileMenu'> = {
  mobileMenu: {
    mobileMenuCategories: [
      {
        category: 'Products',
        mobileMenuItems: [
          {
            title: 'Ory Cloud',
            to: 'https://console.ory.sh/registration'
          },
          {
            title: 'Pricing',
            to: '/pricing'
          }
        ]
      },
      {
        category: 'Solutions',
        mobileMenuItems: [
          {
            title: 'Ory is Open Source',
            to: '/open-source'
          },
          {
            title: 'Identity & User Management',
            to: '/kratos'
          },
          {
            title: 'OAuth 2.0 & OpenIDConnect',
            to: '/hydra'
          },
          {
            title: 'Global Authorization Server',
            to: '/keto'
          },
          {
            title: 'Zero Trust Networking',
            to: '/oathkeeper'
          },
          {
            title: 'GitHub',
            to: 'https://github.com/ory',
            openInNewWindow: true
          }
        ]
      },
      {
        category: 'Developers',
        mobileMenuItems: [
          {
            title: 'Documentation',
            to: '/docs/'
          },
          {
            title: 'Community',
            to: '/community/'
          },
          {
            title: 'Guides & Articles',
            to: '/blog/'
          },
          {
            title: 'Talks & Presentations',
            to: '/summit/2021'
          }
        ]
      },
      {
        category: 'Company',
        mobileMenuItems: [
          {
            title: 'About Us',
            to: '/about/'
          },
          {
            title: 'Jobs',
            to: '/jobs/'
          },
          {
            title: 'Contact Us',
            to: 'mailto:office@ory.sh'
          },
          {
            title: 'Identity Report',
            to: '/identity-in-modern-applications-oreilly/'
          }
        ]
      }
    ]
  }
}
