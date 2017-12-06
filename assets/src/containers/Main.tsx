import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect, Dispatch } from 'react-redux'
import { TextDocument } from 'service/document-service'
import { getDocuments } from 'actions/document-actions'
import { toggleMenu, ToggleMenu, clearError } from 'actions/page-actions'
import { RootState } from '../reducer'
import Main from 'components/Main'

type Props = {
  documents: Array<TextDocument>,
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
    const { documents, error, clearError } = this.props
    return <Main documents={documents} error={error} clearError={clearError} />
  }
}

const mapStateToProps = ({ model, ui, state }: RootState) => {
  return {
    documents: model.documents.all,
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