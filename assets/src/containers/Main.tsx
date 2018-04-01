import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { getDocuments } from 'actions/document-actions'
import { clearError } from 'actions/page-actions'
import { RootState } from '../reducer'
import Main from 'components/Main'

type Props = {
  error: {
    message: string | undefined,
    stack: string | undefined
  },
  getDocuments: () => any,
  clearError: () => any
}

class MainContainer extends React.Component<Props, any> {
  componentDidMount() {
    this.props.getDocuments()
  }

  render() {
    const { error, clearError } = this.props
    return <Main error={error} clearError={clearError} />
  }
}

const mapStateToProps = ({ model, ui, state }: RootState) => {
  return {
    error: state.error
  }
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => {
  return {
    getDocuments: () => getDocuments(dispatch, undefined),
    clearError: () => dispatch(clearError(undefined))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)
