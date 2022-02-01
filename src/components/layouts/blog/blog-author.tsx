import React from 'react'

import Button from '../../freestanding/button/button'

import content from '../../../page-content/content-blog.json'

interface Profile {
  name: string
  fullname: string
  url: string
}

const authors: { [key: string]: Profile } = {
  aeneasr: {
    fullname: 'Aeneas Rekkas',
    github: 'http://github.com/aeneasr'
  },
  oryteam: {
    fullname: 'The Ory Team',
    github: 'http://github.com/ory'
  },
  zepatrik: {
    fullname: 'Patrik Neu',
    github: 'https://github.com/zepatrik'
  },
  vinckr: {
    fullname: 'Vincent Kraus',
    github: 'https://github.com/vinckr'
  },
  radekg: {
    fullname: 'Radek Gruchalski',
    github: 'https://github.com/radekg'
  },
  k9ert: {
    fullname: 'Kim Neunert',
    github: 'https://github.com/k9ert'
  },
  bennihz: {
    fullname: 'Benjamin Hadizamani',
    github: 'https://github.com/bennihz'
  },
  sashatalalasha: {
    fullname: 'Alexandra Talalaieva',
    github: 'https://github.com/sashatalalasha'
  },
  gen1us2k: {
    fullname: 'Andrew Minkin',
    github: 'https://github.com/gen1us2k'
  }
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
