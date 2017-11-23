
import { connect, Dispatch } from 'react-redux'
import { Switch } from 'react-router-dom'
import { RootState } from '../reducer'

const ConnectedSwitch = connect(({ ui }: RootState): any => {
  return {
    location: ui.router.location
  }
})(Switch)

export default ConnectedSwitch