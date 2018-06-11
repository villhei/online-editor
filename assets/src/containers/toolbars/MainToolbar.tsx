import {
  createAndSelect,
  createFolderAndRefresh
} from 'actions/editor-actions'
import {
  getFolder
} from 'actions/folder-actions'
import {
  deleteItems,
  moveItems,
  setSelectedItems
} from 'actions/page-actions'
import MainToolbarView from 'components/toolbars/MainToolbarView'
import ConfirmationModal from 'containers/modals/ConfirmationModal'
import FolderModal from 'containers/modals/FolderModal'
import PromptModal from 'containers/modals/PromptModal'
import createApiResourceWrapper, {
  mapGetResource,
  selectApiResource
} from 'library/containers/ApiResourceHOC'
import {
  ApiResource,
  HasId,
  Map
} from 'library/service/common'
import * as React from 'react'
import {
  connect
} from 'react-redux'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import {
  Folder,
  FolderId,
  isFolder
} from 'service/folder-service'

import ToolbarLoadingView from 'components/toolbars/ToolbarLoadingView'
import { RootState, RouterProvidedProps } from 'main/store'

type StateProps = {
  resourceId: FolderId,
  resource: ApiResource<Folder>,
  itemsSelected: boolean,
  selectedItems: Map<HasId>,
  disabledItems: Map<Folder>
}

type DispatchProps = {
  getResource: (id: FolderId) => void
  createFolder: (name: string, parent: FolderId) => void,
  createDocument: (name: string, folder: FolderId) => void,
  moveItems: (items: Map<HasId>, destination: FolderId) => void,
  deleteItems: (items: Map<HasId>) => void,
  clearSelection: () => void
}

type Props = StateProps & DispatchProps & {
  resource: Folder
}

type State = {
  modal: {
    display: 'none' | 'prompt' | 'confirm' | 'folder',
    icon: string,
    title: string,
    message: string,
    placeholder: string,
    onConfirm: () => void,
    onCancel: () => void
  },
  modalInput: string,
  destinationFolderId?: FolderId
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
  modalInput: '',
  destinationFolderId: undefined
}

class MainToolbar extends React.Component<Props, State> {

  state = initialState

  refresh = () => {
    const { resourceId, getResource } = this.props
    getResource(resourceId)
  }

  handleInputchange = (event: React.FormEvent<HTMLInputElement>) => {
    const { currentTarget } = event
    this.setState({
      ...this.state,
      modalInput: currentTarget.value
    })
  }

  handleSelectDestination = (destinationFolderId: FolderId | undefined) => {
    this.setState({
      destinationFolderId
    })
  }

  handleCreateFolder = () => {
    const { resourceId, createFolder } = this.props
    this.setState({
      modal: {
        display: 'prompt',
        icon: 'folder',
        title: 'Create new folder',
        message: 'Enter the name for the new folder',
        placeholder: 'New folder',
        onConfirm: () => {
          createFolder(this.state.modalInput, resourceId)
          this.setState(initialState)
        },
        onCancel: () => this.setState(initialState)
      }
    })
  }

  handleCreateDocument = () => {
    const { resourceId, createDocument, clearSelection } = this.props
    this.setState({
      modal: {
        display: 'prompt',
        icon: 'file',
        title: 'Create new document',
        message: 'Enter the name for the new document',
        placeholder: 'New document',
        onConfirm: () => {
          createDocument(this.state.modalInput, resourceId)
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

  handleMoveItems = () => {
    const { selectedItems, moveItems, clearSelection } = this.props
    const itemCount = Object.keys(selectedItems).length
    this.setState({
      modal: {
        display: 'folder',
        icon: 'folder',
        title: 'Select destination folder',
        message: `Move selected ${itemCount} items to folder:`,
        placeholder: '',
        onConfirm: () => {
          const { destinationFolderId } = this.state
          if (destinationFolderId) {
            moveItems(selectedItems, destinationFolderId)
            this.setState(initialState)
            clearSelection()
          }
        },
        onCancel: () => this.setState(initialState)
      }
    })
  }

  render() {
    const { resource, resourceId, itemsSelected, selectedItems, disabledItems } = this.props
    const { modal } = this.state
    const { modalInput, destinationFolderId } = this.state
    const isValid = modalInput.length > 0
    return (
      <>
        <MainToolbarView
          moveDisabled={itemsSelected}
          deleteDisabled={itemsSelected}
          moveItems={this.handleMoveItems}
          deleteItems={this.handleDeleteItems}
          title={resource.name}
          refreshFolder={this.refresh}
          createFolder={this.handleCreateFolder}
          createDocument={this.handleCreateDocument}
        />
        {modal.display === 'folder' && <FolderModal
          {...{
            ...modal,
            onSelect: this.handleSelectDestination,
            isValid: Boolean(destinationFolderId),
            selected: destinationFolderId,
            disabledItems: disabledItems,
            initialFolder: resourceId,
            selectedCount: Object.keys(selectedItems).length
          }}
        />}
        {modal.display === 'prompt' && <PromptModal
          {...modal}
          value={modalInput}
          isValid={isValid} onChange={this.handleInputchange}
        />}
        {modal.display === 'confirm' && <ConfirmationModal {...modal} />}
      </>)
  }
}

const mapStateToProps = (state: RootState, ownProps: RouterProvidedProps): StateProps => {
  const itemsSelected = Object.keys(state.ui.page.selectedItems).length === 0
  const { selectedItems } = state.ui.page
  const selectedFolders = Object.values(selectedItems)
    .map(({ id }) => state.model.folders.byId[id])
    .filter(isFolder)

  const childFolders: Map<Folder> = selectedFolders
    .reduce((acc: FolderId[], { children }) => acc.concat(children), [])
    .map((id) => state.model.folders.byId[id])
    .filter(isFolder)
    .concat(selectedFolders)
    .reduce((acc, folder) => ({
      ...acc,
      [folder.id]: folder
    }), {})

  return {
    ...selectApiResource(state.model.folders, ownProps.match.params.folderId),
    itemsSelected,
    selectedItems,
    disabledItems: childFolders
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, {}, Action>): DispatchProps => {
  return {
    ...mapGetResource(dispatch, getFolder),
    createFolder: (name: string, parent: FolderId) => dispatch(createFolderAndRefresh({ resource: { name, parent } })),
    createDocument: (name: string, folder: FolderId) => dispatch(createAndSelect({ resource: { name, folder } })),
    moveItems: (selection: Map<HasId>, destination: FolderId) => dispatch(moveItems({ selection, destination })),
    deleteItems: (items: Map<HasId>) => {
      dispatch(deleteItems(items))
    },
    clearSelection: () => dispatch(setSelectedItems({ selection: {} }))
  }
}

const wrappedResource = createApiResourceWrapper<Folder, Props>(isFolder)(MainToolbar, ToolbarLoadingView)
export default connect(mapStateToProps, mapDispatchToProps)(wrappedResource)
