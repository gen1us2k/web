import { layout } from '../../src/components/layouts/layout/layout.module.css'

export default function withLayout(Story) {
  return (
    <div className={layout}>
      <main>
        <Story />
      </main>
    </div>
  )
}
