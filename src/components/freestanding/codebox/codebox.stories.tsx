import { ComponentStory, ComponentMeta } from '@storybook/react'
import React from 'react'

import Codebox, { Languages } from './codebox'

export default {
  title: 'Primitives/Codebox',
  component: Codebox
} as ComponentMeta<typeof Codebox>

const Template: ComponentStory<typeof Codebox> = (args) => <Codebox {...args} />

export const Primary = Template.bind({})
Primary.args = {
  tabs: [
    {
      code: 'Hello',
      language: Languages.JavaScript,
      filename: 'hello.ts'
    }
  ]
}

export const Secondary = Template.bind({})
Secondary.args = {
  tabs: []
}
