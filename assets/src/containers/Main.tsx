import {
  clearError,
  resolveCurrentUser
} from 'actions/page-actions'
import Main from 'components/Main'
import { RootState } from 'main/store'
import * as React from 'react'
import { connect } from 'react-redux'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

interface StateProps {
  error: {
    message: string | undefined,
    stack: string | undefined
  }
}

interface DispatchProps {
  clearError: () => void,
  getCurrentUser: () => void
}

export type Props = StateProps & DispatchProps

class MainContainer extends React.Component<Props> {
  componentDidMount() {
    this.props.getCurrentUser()
  }
  render() {
    const { error, clearError } = this.props
    return <Main error={error} clearError={clearError} />
  }
}

const mapStateToProps = ({ ui }: RootState): StateProps => {
  return {
    error: ui.error
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, {}, Action>): DispatchProps => {
  return {
    clearError: () => dispatch(clearError(undefined)),
    getCurrentUser: () => dispatch(resolveCurrentUser())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)
