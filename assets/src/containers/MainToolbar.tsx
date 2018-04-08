import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { RootState } from '../reducer'
import { ApiResource, getResourceName, ResourceStatus } from 'service/common'
import { getFolder, createFolder } from 'actions/folder-actions'
import { createFolderAndRefresh, createAndSelect } from 'actions/editor-actions'
import { Folder, FolderId } from 'service/folder-service'
import PromptModal, { Props as PromptModalProps } from 'containers/modals/PromptModal'
import MainToolbarView from 'components/toolbars/MainToolbarView'

type StateProps = {
  folderId: FolderId,
  folder: ApiResource<Folder>
}

type DispatchProps = {
  getFolder: (id: FolderId) => any,
  createFolder: (name: string, parent: FolderId) => any,
  createDocument: (name: string, folder: FolderId) => any
}

type Props = StateProps & DispatchProps

type State = {
  modal: any | null,
  modalInput: string
}
class MainToolbar extends React.Component<Props, State> {

  state = {
    modal: null,
    modalInput: ''
  }

  refresh = () => {
    const { folderId, getFolder } = this.props
    getFolder(folderId)
  }

  handleInputchange = (event: React.FormEvent<HTMLInputElement>) => {
    const { currentTarget } = event
    this.setState({
      ...this.state,
      modalInput: currentTarget.value
    })
  }

  handleCreateFolder = () => {
    const { folderId, createFolder } = this.props
    this.setState({
      modal: {
        icon: 'folder',
        title: 'Create new folder',
        message: 'Enter the name for the new folder',
        placeholder: 'New folder',
        onConfirm: () => {
          createFolder(this.state.modalInput, folderId)
          this.setState({ modal: null })
        },
        onChange: this.handleInputchange,
        onCancel: () => this.setState({ modal: null })
      }
    })
  }

  handleCreateDocument = () => {
    const { folderId, createDocument } = this.props
    this.setState({
      modal: {
        icon: 'file',
        title: 'Create new document',
        message: 'Enter the name for the new document',
        placeholder: 'New document',
        onConfirm: () => {
          createDocument(this.state.modalInput, folderId)
          this.setState({ modal: null })
        },
        onChange: this.handleInputchange,
        onCancel: () => this.setState({ modal: null })
      }
    })
  }

  render() {
    const { folder } = this.props
    const { modal } = this.state
    const refreshing = folder === ResourceStatus.Loading
    const { modalInput } = this.state
    const isValid = modalInput.length > 0
    return (
      <>
        <MainToolbarView
          disabled={!folder}
          refreshing={refreshing}
          title={getResourceName(folder)}
          refreshFolder={this.refresh}
          createFolder={this.handleCreateFolder}
          createDocument={this.handleCreateDocument}
        />
        {modal && <PromptModal {...modal} value={modalInput} isValid={isValid} />}
      </>)
  }
}

const mapStateToProps = ({ model, state, ui }: RootState, ownProps: any): StateProps => {
  const folderId: FolderId = ownProps.match.params.folderId
  const folder: ApiResource<Folder> | undefined = model.folders.byId[folderId]
  return {
    folder,
    folderId
  }
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>): DispatchProps => {
  return {
    getFolder: (id: FolderId) => getFolder(dispatch, { id }),
    createFolder: (name: string, parent: FolderId) => dispatch(createFolderAndRefresh({ folder: { name, parent } })),
    createDocument: (name: string, folder: FolderId) => dispatch(createAndSelect({ document: { name, folder } }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainToolbar)
