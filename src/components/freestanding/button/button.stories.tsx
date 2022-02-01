import { ComponentStory, ComponentMeta } from '@storybook/react'
import React from 'react'

import Button from './button'

export default {
  title: 'Primitives/Button',
  component: Button
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
  children: 'Hello'
}

export const Secondary = Template.bind({})
Secondary.args = {
  children: 'Button'
}
