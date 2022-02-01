import cn from 'classnames'
import React from 'react'

import Button from '../../freestanding/button/button'
import Container from '../../freestanding/containers/container'
import Grid from '../../freestanding/containers/grid'
import ContentText from '../../freestanding/content/content-text'
import Molecule from '../../freestanding/molecule/molecule'
import MoleculeInteraction from '../../freestanding/molecule/molecule-interaction'

import {
  pb48,
  pb64,
  pb8,
  pt24,
  pt32
} from '../../freestanding/utils/padding.module.css'
import { features, featuresContent } from './projects.module.css'

export interface PropTypes {
  id: string
  background?: 'dark' | 'grey' | 'light-grey' | 'themed'
  slant?: boolean
  title: React.ReactElement
  description?: React.ReactElement
  buttons?: React.ReactNode
  projects: Array<Project>
}

interface Project {
  theme: 'hydra' | 'kratos' | 'keto' | 'oathkeeper',
  title: string
  overline: string | React.ReactElement
  descriptiveTitle: string
  description: string
  path: string
}

const ProjectsList = ({
  id,
  background,
  slant,
  title,
  description,
  buttons,
  projects
}: PropTypes) => {
  const ArrowRight = (
    <i className={'ph-arrow-right-bold theme-primary size16'} />
  )

  return (
    <div
      id={id}
      className={cn(
        features,
        {
          ['background-is-grey']: background === 'grey',
          ['background-is-dark']: background === 'dark',
          ['background-is-light-grey']: background === 'light-grey',
          ['background-is-themed']: background === 'themed'
        },
        { ['is-slanted-top-medium']: slant === true }
      )}
    >
      <Container fluid={true} alignItems={'start'}>
        <Grid lg={4} md={12} sm={12} xs={12} className={cn(pb64)}>
          <ContentText>
            <Molecule>
              <h1 className={cn('font-h1')}>{title}</h1>
              {description && (
                <p className={cn('font-p-large', pt32)}>{description}</p>
              )}
            </Molecule>
            <MoleculeInteraction className={cn(pt24)}>
              {buttons}
            </MoleculeInteraction>
          </ContentText>
        </Grid>
        <Grid lg={6} md={12} sm={12} xs={12}>
          <Container alignItems={'start'} justify={'start'}>
            {projects.map((project, index) => (
              <Grid
                lg={6}
                md={6}
                sm={6}
                xs={12}
                className={cn(featuresContent, `theme-${project.theme}`)}
                key={index}
              >
                <Container
                  key={index}
                  className={cn(pb48, featuresContent)}
                  flexContainer={'row'}
                  alignItems={'start'}
                >
                  <ContentText>
                    <h3
                      className={cn('font-overline', 'is-themed-primary', pb8)}
                    >
                      / {project.overline}
                    </h3>
                    <h2 className={cn('font-h5', pb8)}>
                      {project.descriptiveTitle}
                    </h2>
                    <p className={cn('font-p-small', pb8)}>
                      {project.description}
                    </p>
                    <Button
                      to={project.path}
                      style={'link'}
                      iconRight={ArrowRight}
                    >
                      Explore {project.title}
                    </Button>
                  </ContentText>
                </Container>
              </Grid>
            ))}
          </Container>
        </Grid>
      </Container>
    </div>
  )
}

export default ProjectsList
