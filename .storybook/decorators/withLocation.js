import { Location } from '@reach/router'

export default function withLocation(Story) {
  return <Location>{() => <Story />}</Location>
}
