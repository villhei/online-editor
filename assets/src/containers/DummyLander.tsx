import { selectRootFolder } from 'actions/page-actions'
import Loading from 'components/Loading'
import * as React from 'react'
import { Dispatch, connect } from 'react-redux'

import { RootState } from 'main/store'

type DispatchProps = {
  selectRootFolder: () => void
}

class LandingPage extends React.Component<DispatchProps> {
  componentDidMount() {
    this.props.selectRootFolder()
  }
  render() {
    return <Loading />
  }
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>): DispatchProps => {
  return {
    selectRootFolder: () => dispatch(selectRootFolder(undefined))
  }
}
export default connect(undefined, mapDispatchToProps)(LandingPage)
