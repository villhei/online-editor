import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { clearError, selectRootFolder } from 'actions/page-actions'
import { RootState } from '../reducer'
import Main from 'components/Main'

type StateProps = {
  error: {
    message: string | undefined,
    stack: string | undefined
  }
}

type DispatchProps = {
  selectRootFolder: () => any,
  clearError: () => any
}

type Props = StateProps & DispatchProps

class MainContainer extends React.Component<Props, any> {
  componentDidMount() {
    this.props.selectRootFolder()
  }
  render() {
    const { error, clearError } = this.props
    return <Main error={error} clearError={clearError} />
  }
}

const mapStateToProps = ({ model, ui, state }: RootState): StateProps => {
  return {
    error: state.error
  }
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>): DispatchProps => {
  return {
    selectRootFolder: () => dispatch(selectRootFolder(undefined)),
    clearError: () => dispatch(clearError(undefined))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)
