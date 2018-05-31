
import { Location } from 'history'
import { connect } from 'react-redux'
import { Switch } from 'react-router-dom'

import { RootState } from 'main/store'

const ConnectedSwitch = connect(({ ui }: RootState): { location?: Location } => {
  return {
    location: ui.router.location || undefined
  }
})(Switch)

export default ConnectedSwitch
