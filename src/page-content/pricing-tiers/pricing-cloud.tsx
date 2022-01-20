import cn from 'classnames'
import React from 'react'

import { PropTypes as PricingProps } from '../../components/layouts/pricing/pricing'

const Check = <i className={'ph-check-bold themed-primary size16'} />

const Plus = <i className={'ph-plus-bold themed-primary size16'} />

const ArrowLeft = <i className={'ph-arrow-left-bold themed-primary size16'} />

export const pricingCloud: Pick<PricingProps, 'cloud'> = {
  cloud: [
    {
      theme: 'dark',
      title: <>Developer</>,
      description: 'No credit card needed',
      price: 'Free',
      priceDescription: 'forever',
      button: {
        title: 'Start building',
        to: 'https://console.ory.sh/registration?preferred_plan=developer'
      },
      features: [
        {
          icon: Check,
          title: 'Login & Registration APIs'
        },
        {
          icon: Check,
          title: 'UI & Dashboard'
        },
        {
          icon: Check,
          title: 'Ory CLI'
        },
        {
          icon: Check,
          title: 'FIDO2-compliant 2FA'
        },
        {
          icon: Check,
          title: 'Bring your own UI'
        },
        {
          icon: Check,
          title: 'Custom Identity Models'
        },
        {
          icon: Check,
          title: 'Community Support'
        },
        {
          icon: Check,
          title: <>Production Limits apply</>
        }
      ]
    },
    {
      theme: 'light',
      title: <>Start Up</>,
      description: 'Build your business',
      price: '18',
      priceDescription: (
        <>
          The first 900 get the Start Up plan one year for free!
          <span className={cn('is-themed-primary', 'is-semibold')}>
            <sup> 1</sup>
          </span>
        </>
      ),
      priceIsBilledMonthly: true,
      priceIsMonetary: true,
      button: {
        style: 'outlined',
        title: 'Request free access',
        to: 'https://share-eu1.hsforms.com/1KWJxgKzNQWOjR9r5blC41wextgn'
      },
      features: [
        {
          icon: ArrowLeft,
          title: 'All Developer features, plus'
        },
        {
          icon: Plus,
          title: '1 Custom Domain Name'
        },
        {
          icon: Plus,
          title: 'Unlimited identities'
        },
        {
          icon: Plus,
          title: (
            <>
              Fair use policy
              <span className={cn('is-themed-primary', 'is-semibold')}>
                <sup>2</sup>
              </span>
            </>
          )
        }
      ]
    },
    {
      theme: 'light',
      title: <>Growth</>,
      description: 'Scale your business',
      price: 'Coming soon',
      priceDescription: (
        <>
          The first 100 get the Growth plan one year for free!
          <span className={cn('is-themed-primary', 'is-semibold')}>
            <sup> 1</sup>
          </span>
        </>
      ),
      button: {
        title: 'Apply now',
        to: 'https://share-eu1.hsforms.com/10iDKMSYNQ7eABY-CtnQPtAextgn',
        style: 'outlined'
      },
      features: [
        {
          icon: ArrowLeft,
          title: 'All Start Up features, plus'
        },
        {
          icon: Plus,
          title: 'Dedicated support'
        },
        {
          icon: Plus,
          title: 'Add up to 3 team members'
        }
      ]
    },
    {
      theme: 'light',
      title: 'Enterprise',
      description: 'Secure a global userbase',
      price: 'Custom',
      priceDescription: <>Pay for what you use</>,
      priceIsMonetary: false,
      button: {
        title: 'Contact us',
        to: 'mailto:sales@ory.sh',
        style: 'outlined'
      },
      features: [
        {
          icon: ArrowLeft,
          title: 'All Growth features, plus'
        },
        {
          icon: Plus,
          title: 'More Members & Projects'
        },
        {
          icon: Plus,
          title: 'Custom Rate Limit'
        },
        {
          icon: Plus,
          title: 'Support via Ticket System'
        },
        {
          icon: Plus,
          title: 'Support via Voice Calls'
        }
      ]
    }
  ]
}
