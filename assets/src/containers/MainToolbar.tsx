import {
  deleteDocuments
} from 'actions/document-actions'
import {
  createAndSelect,
  createFolderAndRefresh
} from 'actions/editor-actions'
import {
  createFolder,
  deleteFolders,
  getFolder
} from 'actions/folder-actions'
import MainToolbarView from 'components/toolbars/MainToolbarView'
import PromptModal, {
  Props as PromptModalProps
} from 'containers/modals/PromptModal'
import * as React from 'react'
import {
  Dispatch,
  connect
} from 'react-redux'
import {
  ApiResource,
  HasId,
  Map,
  ResourceStatus,
  getResourceName
} from 'service/common'
import {
  Folder,
  FolderId
} from 'service/folder-service'

import { RootState } from '../reducer'

type StateProps = {
  folderId: FolderId,
  folder: ApiResource<Folder>,
  itemsSelected: boolean,
  selectedItems: Map<HasId>
}

type DispatchProps = {
  getFolder: (id: FolderId) => any,
  createFolder: (name: string, parent: FolderId) => any,
  createDocument: (name: string, folder: FolderId) => any,
  moveItems: (items: Map<HasId>) => any,
  deleteItems: (items: Map<HasId>) => any
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

  handleDeleteItems = () => {
    const { selectedItems, deleteItems } = this.props
    deleteItems(selectedItems)
  }

  render() {
    const { folder, itemsSelected } = this.props
    const { modal } = this.state
    const refreshing = folder === ResourceStatus.Loading
    const { modalInput } = this.state
    const isValid = modalInput.length > 0
    return (
      <>
        <MainToolbarView
          disabled={!folder}
          moveDisabled={itemsSelected}
          deleteDisabled={itemsSelected}
          moveItems={() => null}
          deleteItems={this.handleDeleteItems}
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
  const itemsSelected = Object.keys(ui.page.selectedItems).length === 0
  const { selectedItems } = ui.page
  return {
    folder,
    folderId,
    itemsSelected,
    selectedItems
  }
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>): DispatchProps => {
  return {
    getFolder: (id: FolderId) => getFolder(dispatch, { id }),
    createFolder: (name: string, parent: FolderId) => dispatch(createFolderAndRefresh({ resource: { name, parent } })),
    createDocument: (name: string, folder: FolderId) => dispatch(createAndSelect({ resource: { name, folder } })),
    moveItems: (items: Map<HasId>) => null,
    deleteItems: (items: Map<HasId>) => {
      deleteFolders(dispatch, items)
      deleteDocuments(dispatch, items)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainToolbar)
