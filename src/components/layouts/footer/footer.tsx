import cn from 'classnames'
import React from 'react'

import Button from '../../freestanding/button/button'
import Container from '../../freestanding/containers/container'
import Grid from '../../freestanding/containers/grid'

import { pb32 } from '../../freestanding/utils/padding.module.css'
import * as styles from './footer.module.css'

interface MenuItem {
  to: string
  openInNewWindow?: boolean
  title: string
  dotted?: boolean
}

export interface MenuCategory {
  menuCategory: string
  menuItems: Array<MenuItem>
}

interface FooterMain {
  className: string
  logo: string
  category: Array<MenuCategory>
}

export interface FooterPropTypes {
  logo: string
  social: Array<Social>
  legal: Array<MenuItem>
  category: Array<MenuCategory>
}

const FooterMain = ({ className, logo, category }: FooterMain) => (
  <Container fluid={true}>
    <Grid lg={12} md={12} sm={12} xs={12}>
      <Container className={className} alignItems={'start'}>
        <Grid lg={3} md={3} sm={6} xs={6} className={cn(pb32)}>
          <Container
            flexContainer={'column'}
            alignItems={'start'}
            justify={['start-lg', 'start-md', 'start-sm', 'start-xs']}
          >
            <Button to={'/'} style={'none'} className={cn(styles.footerLogo)}>
              <img src={logo} loading={'eager'} alt={'Ory logo'} />
            </Button>
          </Container>
        </Grid>
        <Grid lg={6} md={8} sm={12} xs={12}>
          <Container alignItems={'start'} justify={'space-between'}>
            {category?.map(({ menuCategory, menuItems }, index) => (
              <div key={index} className={cn(styles.footerCategories)}>
                <p
                  className={cn(
                    styles.footerCategory,
                    'font-p-smaller',
                    'is-semibold',
                    'is-mute-text'
                  )}
                >
                  {menuCategory}
                </p>
                {menuItems.map(({
                  to,
                  openInNewWindow,
                  title,
                  dotted,
                }, index) => (
                  <Button
                    key={index}
                    style={'footer'}
                    to={to}
                    openInNewWindow={openInNewWindow}
                  >
                    {title}
                    {dotted ? (<span className={cn('dot')} />) : null}
                  </Button>
                ))}
              </div>
            ))}
          </Container>
        </Grid>
      </Container>
    </Grid>
  </Container>
)

interface Social {
  to: string
  openInNewWindow?: boolean
  icon: string
}

interface FooterSub {
  className?: string
  social: Array<Social>
  legal: Array<MenuItem>
}

const FooterSub = ({ className, social, legal }: FooterSub) => (
  <Container fluid={true}>
    <Grid lg={12} md={12} sm={12} xs={12}>
      <Container
        className={cn(className)}
        alignItems={'center'}
        justify={'space-between'}
      >
        <Grid lg={6} md={6} sm={6} xs={12}>
          <Container
            justify={['start-lg', 'start-md', 'start-sm', 'center-xs']}
            alignItems={'center'}
            className={styles.footerSocialIcons}
          >
            {social?.map(({ to, openInNewWindow, icon }, index) => (
              <Button
                key={index}
                style={'icon'}
                to={to}
                openInNewWindow={openInNewWindow}
                iconLeft={<i className={`${icon} size24`} />}
              />
            ))}
          </Container>
        </Grid>
        <Grid lg={6} md={6} sm={6} xs={12}>
          <Container
            flexContainer={'column'}
            alignItems={['end-lg', 'end-md', 'end-sm', 'center-xs']}
          >
            <p className={cn('font-p-smaller')}>© Copyright 2022 Ory Corp</p>
            <Container justify={'center-xs'}>
              {legal?.map(({ to, openInNewWindow, title }, index) => (
                <Button
                  className={styles.footerLegal}
                  key={index}
                  style={'footer'}
                  to={to}
                  openInNewWindow={openInNewWindow}
                >
                  {title}
                </Button>
              ))}
            </Container>
          </Container>
        </Grid>
      </Container>
    </Grid>
  </Container>
)

const Footer = ({
  logo,
  category,
  social,
  legal
}: FooterPropTypes) => (
  <>
    <div className={cn(styles.footer, 'background-is-dark')}>
      <FooterMain className={cn(pb32)} category={category} logo={logo} />
    </div>
    <div className={cn(styles.footerSub, 'background-is-dark')}>
      <FooterSub social={social} legal={legal} />
    </div>
  </>
)

export default Footer
