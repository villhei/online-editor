import {
  createAndSelect,
  createFolderAndRefresh
} from 'actions/editor-actions'
import {
  getFolder
} from 'actions/folder-actions'
import {
  deleteItems,
  setSelectedItems
} from 'actions/page-actions'
import MainToolbarView from 'components/toolbars/MainToolbarView'
import ConfirmationModal from 'containers/modals/ConfirmationModal'
import PromptModal from 'containers/modals/PromptModal'
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
  deleteItems: (items: Map<HasId>) => any,
  clearSelection: () => any
}

type Props = StateProps & DispatchProps

type State = {
  modal: {
    display: string,
    icon: string,
    title: string,
    message: string,
    placeholder: string,
    onConfirm: () => any,
    onCancel: () => any
  },
  modalInput: string
}

const dummy = () => null

const initialState: State = {
  modal: {
    display: 'none',
    icon: '',
    title: '',
    message: '',
    placeholder: '',
    onConfirm: dummy,
    onCancel: dummy
  },
  modalInput: ''
}

class MainToolbar extends React.Component<Props, State> {

  state = initialState

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
        display: 'prompt',
        icon: 'folder',
        title: 'Create new folder',
        message: 'Enter the name for the new folder',
        placeholder: 'New folder',
        onConfirm: () => {
          createFolder(this.state.modalInput, folderId)
          this.setState(initialState)
        },
        onCancel: () => this.setState(initialState)
      }
    })
  }

  handleCreateDocument = () => {
    const { folderId, createDocument, clearSelection } = this.props
    this.setState({
      modal: {
        display: 'prompt',
        icon: 'file',
        title: 'Create new document',
        message: 'Enter the name for the new document',
        placeholder: 'New document',
        onConfirm: () => {
          createDocument(this.state.modalInput, folderId)
          this.setState(initialState)
          clearSelection()
        },
        onCancel: () => this.setState(initialState)
      }
    })
  }

  handleDeleteItems = () => {
    const { selectedItems, deleteItems, clearSelection } = this.props
    const itemCount = Object.keys(selectedItems).length
    this.setState({
      modal: {
        display: 'confirm',
        icon: 'remove',
        title: 'Delete selected items?',
        message: `Are you sure you want to delete the selected ${itemCount} items?`,
        placeholder: '',
        onConfirm: () => {
          deleteItems(selectedItems)
          this.setState(initialState)
          clearSelection()
        },
        onCancel: () => this.setState(initialState)
      }
    })
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
        {modal.display === 'prompt' && <PromptModal
          {...modal}
          value={modalInput}
          isValid={isValid} onChange={this.handleInputchange}
        />}
        {modal.display === 'confirm' && <ConfirmationModal {...modal} />}
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
      dispatch(deleteItems(items))
    },
    clearSelection: () => dispatch(setSelectedItems({ selection: {} }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainToolbar)
