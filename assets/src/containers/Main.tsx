import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { TextDocument } from 'service/document-service'
import { Folder, isFolder } from 'service/folder-service'
import { ApiResource, ResourceStatus } from 'service/common'
import { getDocumentsByFolder } from 'actions/document-actions'
import { getRootFolder } from 'actions/folder-actions'
import { toggleMenu, ToggleMenu, clearError } from 'actions/page-actions'
import { RootState } from '../reducer'
import Main from 'components/Main'

type StateProps = {
  folder: ApiResource<Folder>
  documents: Array<TextDocument>
  error: {
    message: string | undefined,
    stack: string | undefined
  }
}

type DispatchProps = {
  getFolder: () => any,
  getDocumentsByFolder: (folder: string) => any,
  clearError: () => any
}

type Props = StateProps & DispatchProps

class MainContainer extends React.Component<Props, any> {
  componentDidMount() {
    this.props.getFolder()
  }

  componentDidUpdate(prevProps: Props) {
    const { folder } = this.props
    if (prevProps.folder === ResourceStatus.Loading
      && isFolder(folder)) {
      this.props.getDocumentsByFolder(folder.name)
    }
  }

  render() {
    const { error, clearError } = this.props
    return <Main error={error} clearError={clearError} />
  }
}

const mapStateToProps = ({ model, ui, state }: RootState): StateProps => {
  return {
    folder: model.navigator.folder,
    documents: model.documents.all,
    error: state.error
  }
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>): DispatchProps => {
  return {
    getFolder: () => getRootFolder(dispatch, undefined),
    getDocumentsByFolder: (folder: string) => getDocumentsByFolder(dispatch, folder),
    clearError: () => dispatch(clearError(undefined))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)
