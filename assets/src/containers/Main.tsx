import {
  clearError
} from 'actions/page-actions'
import Main from 'components/Main'
import * as React from 'react'
import { Dispatch, connect } from 'react-redux'

import { RootState } from '../reducer'

type StateProps = {
  error: {
    message: string | undefined,
    stack: string | undefined
  }
}

type DispatchProps = {
  clearError: () => any
}

type Props = StateProps & DispatchProps

class MainContainer extends React.Component<Props, any> {
  render() {
    const { error, clearError } = this.props
    return <Main error={error} clearError={clearError} />
  }
}

const mapStateToProps = ({ state }: RootState): StateProps => {
  return {
    error: state.error
  }
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>): DispatchProps => {
  return {
    clearError: () => dispatch(clearError(undefined))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)
