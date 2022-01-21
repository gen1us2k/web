import 'normalize.css'
import 'phosphor-icons/src/css/phosphor.css'
import 'prismjs/themes/prism.css'
import 'remark-admonitions/styles/classic.css'

import '../src/styles/global.css'
import '../src/styles/grid.css'
import '../src/styles/icons.css'
// import '../src/styles/themes/default.css'
import '../src/styles/typography.css'

import 'prismjs'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-pug'
import 'prismjs/components/prism-shell-session'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-yaml'

import * as styles from '../src/components/layouts/layout/layout.module.css'
// import { Location } from '@reach/router'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  decorators: [
    (Story) => (
      // <Location>
      //   {() => (
          <div className={cn(styles.layout)}>
            <main>
              <Story />
            </main>
          </div>
      //   )}
      // </Location>
    )
  ],
  // controls: {
  //   matchers: {
  //     color: /(background|color)$/i,
  //     date: /Date$/,
  //   },
  // },
}
