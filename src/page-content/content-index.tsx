import {StaticImage} from 'gatsby-plugin-image'
import React from 'react'

import Button from '../components/freestanding/button/button'
import CodeBox, {
  Languages,
  PropTypes as CodeBoxProps
} from '../components/freestanding/codebox/codebox'
import {PropTypes as CodingProps} from '../components/layouts/coding/coding'
import {PropTypes as FeatureContentProps} from '../components/layouts/feature-content/feature-content'
import {PropTypes as HeroProps} from '../components/layouts/hero/hero'
import {PropTypes as QuickstartProps} from '../components/layouts/quickstart/quickstart'
import {PropTypes as SeoProps} from '../components/layouts/seo/seo'
import {PropTypes as HeroImageProps} from "../components/layouts/hero/hero-image";
import Cloud from "../images/illustrations/hero.png";

const ArrowRight = <i className="ph-arrow-right-bold size16"/>
const Terminal = <i className="ph-terminal-fill size32"/>
const GitMerge = <i className="ph-git-merge-fill size32"/>

export const seo: SeoProps = {
  description:
    'Ory is a certified and battle-tested identity solution backed by a large open source community and trusted by Fortune500.',
  title: 'Ory - Open Source Identity Solutions For Everyone',
  keywords:
    'authentication, open source, login, authorization, security, session management, Json web tokens, access control, OAuth2.0 server, identity server, AuthN, AuthZ'
}

export const hero: HeroProps = {
  id: 'index.hero',
  title: (
    <>
      <span className={'is-themed-primary'}>Open Source </span> Identity Infrastructure
    </>
  ),
  description:
    'Ory is the only identity platform that can scale indefinitely and is based entirely on open source.',
  buttons: [
    {
      ctaTitle: 'Start with Ory Cloud',
      style: 'filled',
      to: '/cloud'
    }
  ]
}

export const featureContentCloud: FeatureContentProps = {
  id: 'index.featurecontent.cloud',
  slant: true,
  overline: <>Get started in minutes with Ory Cloud</>,
  title: (
    <>
      <span className={'is-mute-text'}> Hosted by us,</span>
      {''} Managed by you
    </>
  ),
  description: (
    <>
     Benefit from hardened Ory Open Source services and skip the setup with Ory Cloud.
    </>
  ),
  button: {
    ctaTitle: 'Test now',
    to: 'https://www.ory.sh/cloud',
    iconRight: ArrowRight
  },
  content: (
    <StaticImage
      loading="lazy"
      className="responsive"
      alt="Ory Open Source Ecosystem Illustration"
      src="../images/illustrations/examplelogin.png"
    />
  )
}

export const featureContentLogin: FeatureContentProps = {
  id: 'index.featurecontent.cloud',
  slant: true,
  background: 'grey',
  overline: <>Identity & Access Management</>,
  title: (
    <>
      <span className={'is-mute-text'}>Login and Authentication</span>
      {''} for Applications.
    </>
  ),
  description: (
    <>
      Ory provides open source authentication and access control APIs for everyone. 
    </>
  ),
  button: {
    ctaTitle: 'Learn more',
    to: 'https://www.ory.sh/docs/',
    iconRight: ArrowRight
  },
  content: (
    <StaticImage
      loading="lazy"
      className="responsive"
      alt="Ory Open Source Ecosystem Illustration"
      src="../images/illustrations/examplelogin.png"
    />
  ),
  feature: {
    title: <>Built for developers</>,
    description: (
      <>
        Authenticate and manage users, set and check permissions, protect your APIs, applications, and data.
      </>
    ),
    features: [
      {
        title: <>Secure by design</>,
        description: (
          <>
MFA, permissions and roles, custom branding and flows, OAuth 2.0,
            OIDC, IAP, RBAC, integrations and{' '}
            <Button
              to={'https://www.ory.sh/docs/ecosystem/projects'}
              style={'link-inline'}
            >
              more
            </Button>.
          </>
        )
      },
      {
        title: <>Proven Quality</>,
        description: (
          <>
            Ory is rooted in open source software and grows with every community member and pull-request.
          </>
        )
      }
    ]
  }
}

export const featureContentUX: FeatureContentProps = {
  id: 'index.featurecontent.ux',
  slant: true,
  background: 'dark',
  overline: 'Customizable UI',
  title: (
    <>
      <span className={'is-mute-text'}>Your login,</span>
      {''} your design
    </>
  ),
  description: (
    <>
      Ory is completely headless - bring your own UI in your favorite language. 
    </>
  ),
  button: {
    ctaTitle: 'Read more',
    to: 'https://www.ory.sh/docs/',
    iconRight: ArrowRight
  },
  content: (
    <StaticImage
      loading="lazy"
      className="responsive"
      alt="Individual styling on user interfaces"
      src="../images/illustrations/examplelogin.png"
    />
  )
}

export const codingCodeBox: CodeBoxProps = {
  tabs: [
    {
      filename: '',
      language: Languages.Shell,
      code: `$ export ORY_ACCESS_TOKEN=RaEEZfMbx7QGuf0uWNt9c15NE4FG4
$ ory identities list --project playground 
--format json-pretty  
[
  {
    "id": "7c7d040d-97f6-4a57-95e8-08c61e6df016",
    "schema_id": "default",
    "schema_url": "https://custom.domain.com/api/
    kratos/public/schemas/default",
    "traits": {
      "email": "alice@example.com"
    }
  },
    {
    "id": "7f6d040d-97c7-4a59-85e7-6df01608c61e",
    "schema_id": "default",
    "schema_url": "https://custom.domain.com/api/
    kratos/public/schemas/default",
    "traits": {
      "email": "stephan@example.com"
    }
  }
]`
    }
  ]
}

export const coding: CodingProps = {
  id: 'index.coding',
  slant: true,
  background: 'grey',
  overline: 'Modern tooling',
  title: (
    <>
      <span className={'is-mute-text'}>We're all about</span>
      {''} developer experience
    </>
  ),
  description: (
    <>
      SDKs for any language, clear documentation, tutorials, and community
      support are our standards. Our open source approach also means you get to
      participate in API and architecture discussions - your next PR will be
      shipped in Ory Cloud.
    </>
  ),
  button: {
    ctaTitle: 'Visit our documentation',
    to: '/docs/get-started',
    iconRight: ArrowRight
  },
  additional: {
    title: <>The CLI to get things done</>,
    description: (
      <>
        We love working from the CLI - so we built one for Ory that you will
        love too.
      </>
    ),
    button: {
      ctaTitle: 'Install the CLI',
      to: '/docs/get-started',
      iconRight: ArrowRight
    }
  },
  codebox: <CodeBox {...codingCodeBox} />,
  content: [
    {
      icon: Terminal,
      title: <>Powerful tools</>,
      description: (
        <>
          Ory ships REST APIs, gRPC APIs, SDKs, and CLIs for all operating
          systems and CPUs.
        </>
      ),
      button: (
        <Button
          to={'/docs/guides/ory-cli-install-use'}
          style={'link'}
          iconRight={ArrowRight}
        >
          Install the CLI
        </Button>
      )
    },
    {
      icon: GitMerge,
      title: <>Based on Open Source</>,
      description: (
        <>Participate in discussions, feature requests, and PRs on GitHub.</>
      ),
      button: (
        <Button
          to={'https://github.com/ory/'}
          style={'link'}
          iconRight={ArrowRight}
        >
          Star us on GitHub
        </Button>
      )
    }
  ]
}

export const quickstart: QuickstartProps = {
  id: 'index.quickstart',
  background: 'light-grey',
  slant: true,
  title: (
    <>
      Power up <span className={'is-mute-text'}>your stack</span>
    </>
  ),
  description: (
    <>
      We want to help with any questions you have! Fill out the Form below and a Ory expert will reach out to discuss your needs.
    </>
  ),
  buttons: [
    {
      ctaTitle: 'Contact us',
      style: 'filled',
      to: 'mailto:sales@ory.sh'
    }
  ],
  content: [
    {
      title: <>Detailed Docs</>,
      description: (
        <>
          Get started right away and explore Ory! Review our documentation and breeze through technical concepts, level up with our tutorials or
          master our extensive API reference.
        </>
      ),
      button: (
        <Button to={'/docs/'} style={'link'} iconRight={ArrowRight}>
          Explore
        </Button>
      )
    },
    {
      title: <>A helpful community</>,
      description: (
        <>
          The Ory Open Source community is a great resource for help and advice. Chat with peers, discuss code and gain insights from the open source
          at the heart.
        </>
      ),
      button: (
        <Button
          to={'https://slack.ory.sh'}
          style={'link'}
          iconRight={ArrowRight}
        >
          Join us on Slack
        </Button>
      )
    }
  ]
}
