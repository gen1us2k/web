import React from 'react'

import Button from '../../freestanding/button/button'

import content from '../../../page-content/content-blog.json'

interface Profile {
  name: string
  fullname: string
  url: string
}

const useProfile = (name: string): Profile =>
  React.useMemo(
    () =>
      content.authors.find(({ name: authorName }) => authorName === name) || {
        name: '',
        fullname: '',
        url: ''
      },
    [name]
  )

export const AuthorName = ({
  name,
  className
}: {
  name: string
  className: string
}) => {
  const { fullname } = useProfile(name)
  return <span className={className}>{fullname ?? name}</span>
}

export const AuthorLink = ({
  name,
  className
}: {
  name: string
  className?: string
}) => {
  const { fullname, url } = useProfile(name)
  if (!url) {
    return <span className={className}>{fullname || name}</span>
  }

  return (
    <Button className={className} style={'link-inline'} to={url}>
      {fullname || name}
    </Button>
  )
}
