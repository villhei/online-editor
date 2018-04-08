import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { clearError, selectRootFolder } from 'actions/page-actions'
import { RootState } from '../reducer'
import Loading from 'components/Loading'

type Props = {
  selectRootFolder: () => any
}

class LandingPage extends React.Component<Props, any> {
  componentDidMount() {
    this.props.selectRootFolder()
  }
  render() {
    return <Loading />
  }
}

const mapStateToProps = ({ model, ui, state }: RootState) => ({})

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => {
  return {
    selectRootFolder: () => dispatch(selectRootFolder(undefined))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LandingPage)
