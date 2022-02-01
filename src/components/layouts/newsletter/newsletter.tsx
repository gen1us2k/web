import cn from 'classnames'
import React, {
  ChangeEvent,
  MouseEvent,
  ReactNode,
  FormEvent,
  useState
} from 'react'

import Container from '../../freestanding/containers/container'
import Grid from '../../freestanding/containers/grid'
import ContentText from '../../freestanding/content/content-text'
import Form from '../forms/forms'

import { pb32 } from '../../freestanding/utils/padding.module.css'
import * as styles from './newsletter.module.css'

const projects = {
  kratos: '&group[17097][4]=1',
  hydra: '&group[17097][8]=1',
  oathkeeper: '&group[17097][16]=1',
  keto: '&group[17097][32]=1'
}

interface PropTypes {
  background?: 'dark' | 'grey' | 'light-grey' | 'themed'
  slant?: boolean
  smallpadding?: boolean
  special?: ReactNode
  preselect?: keyof typeof projects,
  title?: string
  teaser?: string
  placeholder?: string
  submit?: string
}

const Newsletter = ({
  slant = true,
  smallpadding,
  background = 'dark',
  preselect,
  special,
  title = 'Never miss a patch',
  teaser = 'Ory ships regular product patches and updates. Subscribe to our newsletter to get the good stuff, and stay up to date.',
  placeholder = 'Enter your email',
  submit = 'Subscribe'
}: PropTypes) => {
  const [email, setEmail] = useState('')

  const onSubmit = (
    e: MouseEvent<HTMLInputElement> | FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()
    window.open(
      'https://ory.us10.list-manage.com/subscribe?u=ffb1a878e4ec6c0ed312a3480&id=f605a41b53&MERGE0=' +
        encodeURIComponent(email) +
        (preselect ? projects[preselect] : '')
    )
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  return (
    <div
      className={cn(
        styles.newsletter,
        {
          [styles.smallPadding]: smallpadding,
          [styles.noBackground]: !background,
          ['background-is-grey']: background === 'grey',
          ['background-is-dark']: background === 'dark',
          ['background-is-light-grey']: background === 'light-grey',
          ['background-is-themed']: background === 'themed'
        },
        {
          ['is-slanted-top-medium']: slant === true
        }
      )}
    >
      <Container fluid={true} justify={'center'}>
        <Grid lg={5} md={8} sm={10} xs={12} className={cn(pb32)}>
          <ContentText>
            <Container justify={'center'} className={cn(styles.textAlign)}>
              {special ? (
                special
              ) : (
                <>
                  <h3 className={cn('font-h2', pb32)}>{title}</h3>
                  <p className={cn('font-p', pb32)}>
                    {teaser}
                  </p>
                </>
              )}
            </Container>
          </ContentText>
          <Form
            isSingleLine={true}
            content={[
              {
                type: 'email',
                name: 'email',
                placeholder,
                required: true,
                onChange: onChange,
                value: email
              },
              {
                type: 'submit',
                name: 'submit',
                value: submit
              }
            ]}
            onSubmit={onSubmit}
          />
        </Grid>
      </Container>
    </div>
  )
}

export default Newsletter
