import {
  clearError
} from 'actions/page-actions'
import Main from 'components/Main'
import * as React from 'react'
import { Dispatch, connect } from 'react-redux'

import { RootState } from 'main/store'

interface StateProps {
  error: {
    message: string | undefined,
    stack: string | undefined
  }
}

interface DispatchProps {
  clearError: () => void
}

export type Props = StateProps & DispatchProps

class MainContainer extends React.Component<Props> {
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

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    clearError: () => dispatch(clearError(undefined))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)
