import { selectRootFolder } from 'actions/page-actions'
import Loading from 'components/Loading'
import { RootState } from 'main/store'
import * as React from 'react'
import { connect } from 'react-redux'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
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

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, {}, Action>): DispatchProps => {
  return {
    selectRootFolder: () => dispatch(selectRootFolder({}))
  }
}
export default connect(undefined, mapDispatchToProps)(LandingPage)
