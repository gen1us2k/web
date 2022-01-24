import cn from 'classnames'
import React from 'react'

import { FooterPropTypes } from '../../components/layouts/footer/footer'

export const copyright: Pick<FooterPropTypes, 'copyright'> = {
  copyright: <>© Copyright 2021 Ory Corp</>
}

export const social: Pick<FooterPropTypes, 'social'> = {
  social: [
    {
      to: 'https://www.github.com/ory',
      openInNewWindow: true,
      icon: <i className={'ph-github-logo-fill size24'} />
    },
    {
      to: 'https://www.youtube.com/channel/UC9hCxZZeviexX0GclD0brrw',
      openInNewWindow: true,
      icon: <i className={'ph-youtube-logo-fill size24'} />
    },
    {
      to: 'https://twitter.com/orycorp',
      openInNewWindow: true,
      icon: <i className={'ph-twitter-logo-fill size24'} />
    },
    {
      to: 'https://slack.ory.sh/',
      openInNewWindow: true,
      icon: <i className={'ph-slack-logo-fill size24'} />
    },
    {
      to: 'https://www.linkedin.com/company/ory-corp/',
      openInNewWindow: true,
      icon: <i className={'ph-linkedin-logo-fill size24'} />
    }
  ]
}

export const legal: Pick<FooterPropTypes, 'legal'> = {
  legal: [
    {
      title: 'Status',
      to: 'https://status.ory.sh/',
      openInNewWindow: true
    },
    {
      title: 'Privacy',
      to: '/privacy'
    },
    {
      title: 'Terms of Service',
      to: '/tos'
    }
  ]
}

export const links: Pick<FooterPropTypes, 'category'> = {
  category: [
    {
      menuCategory: 'Products',
      menuItems: [
        {
          title: 'Ory Cloud',
          to: 'https://console.ory.sh/registration',
          openInNewWindow: true
        },
        {
          title: 'Pricing',
          to: '/pricing'
        }
      ]
    },
    {
      menuCategory: 'Solutions',
      menuItems: [
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
        }
      ]
    },
    {
      menuCategory: 'Developers',
      menuItems: [
        {
          title: 'Documentation',
          to: '/docs'
        },
        {
          title: 'Community',
          to: '/community'
        },
        {
          title: 'Guides & Articles',
          to: '/blog'
        },
        {
          title: 'NextJS',
          to: '/nextjs'
        },
        {
          title: 'GitHub',
          to: 'https://github.com/ory',
          openInNewWindow: true
        }
      ]
    },
    {
      menuCategory: 'Company',
      menuItems: [
        {
          title: 'About us',
          to: '/about'
        },
        {
          title: (
            <>
              Jobs <span className={cn('dot')} />
            </>
          ),
          to: '/jobs'
        },
        {
          title: 'Identity Report',
          to: '/identity-in-modern-applications-oreilly'
        }
      ]
    },
    {
      menuCategory: 'Events',
      menuItems: [
        {
          title: (
            <>
              Ory Summit
              <span className={cn('dot')} />
            </>
          ),
          to: '/summit21',
          openInNewWindow: true
        }
      ]
    },
    {
      menuCategory: 'Talk to us',
      menuItems: [
        {
          title: 'Contact',
          to: 'mailto:office@ory.sh',
          openInNewWindow: true
        },
        {
          title: 'Slack',
          to: 'https://slack.ory.sh/',
          openInNewWindow: true
        }
      ]
    }
  ]
}
