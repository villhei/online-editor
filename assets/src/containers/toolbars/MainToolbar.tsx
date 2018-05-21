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
import wrapApiResource, {
  mapGetResource,
  selectApiResource
} from 'containers/ApiResourceHOC'
import ConfirmationModal from 'containers/modals/ConfirmationModal'
import FolderModal from 'containers/modals/FolderModal'
import PromptModal from 'containers/modals/PromptModal'
import * as React from 'react'
import {
  Dispatch,
  connect
} from 'react-redux'
import {
  ApiResource,
  HasId,
  Map
} from 'service/common'
import {
  Folder,
  FolderId,
  isFolder
} from 'service/folder-service'

import ToolbarLoadingView from 'components/toolbars/ToolbarLoadingView'
import { RootState, RouterProvidedProps } from 'main/reducer'

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
  destinationFolder?: Folder
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
  destinationFolder: undefined
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

  handleSelectDestination = (destinationFolder: Folder | undefined) => {
    this.setState({
      destinationFolder
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
          const { destinationFolder } = this.state
          if (destinationFolder) {
            moveItems(selectedItems, destinationFolder.id)
            this.setState(initialState)
            clearSelection()
          }
        },
        onCancel: () => this.setState(initialState)
      }
    })
  }

  render() {
    const { resource, resourceId, itemsSelected, disabledItems } = this.props
    const { modal } = this.state
    const { modalInput, destinationFolder } = this.state
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
          {...modal}
          onSelect={this.handleSelectDestination}
          isValid={Boolean(destinationFolder)}
          selected={destinationFolder}
          disabledItems={disabledItems}
          initialFolder={resourceId}
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
    ...selectApiResource(state, 'folders', ownProps.match.params.folderId),
    itemsSelected,
    selectedItems,
    disabledItems: childFolders
  }
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>): DispatchProps => {
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

const wrappedResource = wrapApiResource<Folder, Props>(isFolder)(MainToolbar, ToolbarLoadingView)
export default connect(mapStateToProps, mapDispatchToProps)(wrappedResource)
