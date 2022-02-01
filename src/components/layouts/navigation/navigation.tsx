import cn from 'classnames'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel
} from 'react-accessible-accordion'

import { useWindowSize } from '../../../hook/useWindowSize'
import announcement from '../../../page-content/navigation/navigation-announcement'
import Button from '../../freestanding/button/button'
import Container from '../../freestanding/containers/container'
import ContentText from '../../freestanding/content/content-text'
import DropdownItem from '../../freestanding/dropdown/dropdown-item'
import DropdownMenu from '../../freestanding/dropdown/dropdown-menu'
import DropdownMobileItem from '../../freestanding/dropdown/dropdown-mobile-item'
import { DropdownMobileMenu } from '../../freestanding/dropdown/dropdown-mobile-menu'
import MenuItem from '../../freestanding/dropdown/menu-item'

import Announcement from './announcement'

import {
  pb16,
  pb24,
  pb32,
  pb48,
  pb8,
  pl8,
  pr32,
  pt16
} from '../../freestanding/utils/padding.module.css'
import * as styles from './navigation.module.css'

export interface DropdownMenuItem {
  title: string
  dotted?: boolean
  to?: string
  mainMenu?: Array<DropdownMainItem>
  sideMenu?: Array<DropdownSideItem>
}

export interface MobileMenu {
  mobileMenuCategories: Array<MobileMenuCategory>
}

export interface MobileMenuCategory {
  category: string
  mobileMenuItems: Array<MobileMenuItems>
}

export interface MobileMenuItems {
  title: string
  description?: string
  to: string
  openInNewWindow?: boolean
  className?: string
}

export interface DropdownMainItem {
  title: string
  description?: string
  dotted?: boolean
  to: string
  openInNewWindow?: boolean
  iconLeft?: React.ReactElement
  className?: string
}

export interface DropdownSideItem {
  button: React.ReactElement
  description: string
}

export interface PropTypes {
  logo: string
  dropdownMenu: Array<DropdownMenuItem>
  mobileMenu: MobileMenu
  sideNav: React.ReactNode[]
}

const Minus = <i className={cn(pl8, 'ph-minus-fill size24')} />
const Plus = <i className={cn(pl8, 'ph-plus-fill size24')} />
const List = <i className={'ph-list-fill size32'} />

const onClickOutsideRef = (
  refs: Array<React.MutableRefObject<any>>,
  handler: (e: MouseEvent | TouchEvent) => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (
        refs.filter(
          (value) => !value.current || value.current.contains(event.target)
        ).length > 0
      ) {
        return
      }

      handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  })
}

const Navigation = ({ logo, dropdownMenu, mobileMenu, sideNav }: PropTypes) => {
  const [mobileOpenNav, setMobileOpenNav] = useState<boolean>(false)
  const [expanded, setExpanded] = useState<Array<string>>(['0'])
  const [openMenu, setOpenMenu] = useState<string>()

  const currentNode = useRef<any>(null)
  const currentMobileNavBtnNode = useRef<any>(null)
  const currentMobileNode = useRef<any>(null)
  const windowSize = useWindowSize()

  let mobileNav = cn(styles.mobileContainer)
  if (mobileOpenNav) {
    mobileNav = cn(styles.mobileNavActive)
  }

  onClickOutsideRef(
    [currentNode, currentMobileNode, currentMobileNavBtnNode],
    () => {
      setOpenMenu('')
      setMobileOpenNav(false)
    }
  )

  useEffect(() => {
    if (typeof document === 'undefined') {
      return
    }

    const overflow =
      mobileOpenNav && windowSize.width < 960 ? 'hidden' : 'inherit'
    document.body.style.overflow = overflow
    document.documentElement.style.overflow = overflow
  }, [mobileOpenNav, windowSize])

  return (
    <div
      className={cn(styles.navigation, {
        [styles.navigationMobileOpen]: mobileOpenNav
      })}
    >
      <Announcement {...announcement} />{' '}
      <Container
        fluid={true}
        noWrap={true}
        justify={'start'}
        alignItems={'center'}
        className={styles.navigationContainer}
      >
        <Button to={'/'} style={'none'} className={cn(styles.navLogo)}>
          <img src={logo} loading={'eager'} alt={'Ory logo'} />
        </Button>

        <nav role={'navigation'} ref={currentNode} className={styles.flex}>
          <Container justify={'start'} smHidden={true} xsHidden={true}>
            {dropdownMenu.map(({ title, mainMenu, sideMenu, dotted, to }, index) => {
              if (to) {
                return (
                  <MenuItem
                    title={title}
                    dotted={dotted}
                    key={index}
                    className={cn(pr32)}
                    onClick={to}
                  />
                )
              }

              return (
                <MenuItem
                  title={title}
                  dotted={dotted}
                  key={index}
                  className={cn(pr32)}
                  onClick={() =>
                    setOpenMenu((current) => {
                      if (current === String(index)) {
                        return ''
                      }
                      return String(index)
                    })
                  }
                >
                  <DropdownMenu show={openMenu === String(index)}>
                    {mainMenu &&
                      mainMenu.map(
                        (
                          {
                            title,
                            description,
                            to,
                            openInNewWindow,
                            dotted,
                            className
                          },
                          index
                        ) => (
                          <DropdownItem
                            className={className}
                            onClick={() => setOpenMenu('')}
                            key={index}
                            openInNewWindow={openInNewWindow}
                            to={to}
                            title={title}
                            dotted={dotted}
                            description={description}
                          />
                        )
                      )}
                    {sideMenu && (
                      <Container
                        flexContainer={'column'}
                        justify={'start'}
                        alignItems={'start'}
                      >
                        {sideMenu.map(({ description, button }, index) => (
                          <ContentText key={index} className={cn(pb24)}>
                            {button}
                            <p className={cn('font-p-small')}>{description}</p>
                          </ContentText>
                        ))}
                      </Container>
                    )}
                  </DropdownMenu>
                </MenuItem>
              )
            })}
          </Container>
        </nav>

        <Container justify={'end'} smHidden={true} xsHidden={true}>
          {sideNav &&
            sideNav.map((x, index) => (
              <div className={cn(styles.sidenavButtons)} key={index}>
                {x}
              </div>
            ))}
        </Container>

        <Container
          lgHidden={true}
          mdHidden={true}
          ref={currentMobileNavBtnNode}
        >
          <Button
            to={() => setMobileOpenNav((current) => !current)}
            style={'icon'}
          >
            {List}
          </Button>
        </Container>
      </Container>
      <div className={cn(mobileNav)} ref={currentMobileNode}>
        <DropdownMobileMenu>
          <div className={cn(pb32)}>
            {sideNav.map((side, index) => (
              <div className={cn(pb8)} key={index}>
                {side}
              </div>
            ))}
          </div>
          <Accordion
            allowMultipleExpanded={false}
            allowZeroExpanded={true}
            preExpanded={['0']}
            onChange={(args: Array<string>) => {
              setExpanded(args)
            }}
          >
            {mobileMenu.mobileMenuCategories.map(
              ({ category, mobileMenuItems }, index) => (
                <AccordionItem
                  key={index}
                  uuid={String(index)}
                  className={cn(pb16)}
                >
                  <AccordionItemHeading>
                    <AccordionItemButton className={cn(styles.mobileCategory)}>
                      <p className={cn(styles.mobileCategory, 'font-nav')}>
                        {category}
                      </p>
                      {expanded.includes(String(index)) ? Minus : Plus}
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel className={cn(pt16)}>
                    {mobileMenuItems.map(
                      (
                        { title, description, to, openInNewWindow, className },
                        index
                      ) => (
                        <DropdownMobileItem
                          className={className}
                          onClick={() =>
                            setMobileOpenNav((current) => !current)
                          }
                          key={index}
                          openInNewWindow={openInNewWindow}
                          to={to}
                          title={title}
                        />
                      )
                    )}
                  </AccordionItemPanel>
                </AccordionItem>
              )
            )}
          </Accordion>
        </DropdownMobileMenu>
      </div>
    </div>
  )
}

export default Navigation
