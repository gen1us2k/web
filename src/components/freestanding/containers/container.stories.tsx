import { ComponentStory, ComponentMeta } from '@storybook/react'
import React from 'react'

import Container from './container'

export default {
  title: 'Primitives/Container',
  component: Container
} as ComponentMeta<typeof Container>

const Template: ComponentStory<typeof Container> = (args) => (
  <Container {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  children: 'Hello'
}

export const Secondary = Template.bind({})
Secondary.args = {}
