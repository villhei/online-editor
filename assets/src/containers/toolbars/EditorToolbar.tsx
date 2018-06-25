import { getDocument, updateDocument } from 'actions/document-actions'
import {
  deleteAndRefresh,
  modifyDocument,
  resetDocumentChanges
} from 'actions/editor-actions'
import EditorToolbarView from 'components/toolbars/EditorToolbarView'
import ToolbarError from 'components/toolbars/ToolbarError'
import ToolbarLoadingView from 'components/toolbars/ToolbarLoadingView'
import ToolbarNotFound from 'components/toolbars/ToolbarNotFound'
import ConfirmationModal from 'containers/modals/ConfirmationModal'
import createApiResourceWrapper, { selectApiResource } from 'library/containers/ApiResourceHOC'
import { mapGetResource } from 'library/containers/common'
import {
  ApiResource,
  ApiResourceId
} from 'library/service/common'
import { RootState, RouterProvidedProps } from 'main/store'
import * as React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import {
  PartialTextDocument,
  TextDocument,
  TextDocumentId,
  isDocument
} from 'service/document-service'

const CONFIRM_VIEW_ICON = 'share'
const CONFIRM_ARE_YOU_SURE_TITLE = 'Are you sure?'
const CONFIRM_VIEW_MESSAGE = 'You have unsaved changes. Viewing the document without saving will discard the changes.'

const CONFIRM_RELOAD_ICON = 'reload'
const CONFIRM_RELOAD_MESSAGE = 'You have unsaved changes. Reloading the document without saving will discard the changes.'

const CONFIRM_DELETE_ICON = 'trash'
const CONFIRM_DELETE_TITLE = 'Confirm deletion'
const CONFIRM_DELETE_MESSAGE = 'Are you sure you want to delete this document?'

export interface StateProps {
  resourceId: string,
  resource: ApiResource<TextDocument>,
  modifiedDocument: PartialTextDocument,
  isModified: boolean,
  deleting: boolean,
  refreshing: boolean,
  saving: boolean
  getResource: (id: TextDocumentId) => void,
  saveDocument: (id: TextDocumentId, document: PartialTextDocument) => void,
  resetDocumentChanges: () => void,
  deleteAndRefresh: (document: TextDocument) => void,
  updateDocumentName: (id: TextDocumentId, value: string, updated: string) => void,
  navigate: (route: string) => void
}

export interface Props extends StateProps {
  resource: TextDocument
}

const ACTIONS = {
  'delete': {
    icon: CONFIRM_DELETE_ICON,
    title: CONFIRM_DELETE_TITLE,
    message: CONFIRM_DELETE_MESSAGE
  },
  'refresh': {
    icon: CONFIRM_RELOAD_ICON,
    title: CONFIRM_ARE_YOU_SURE_TITLE,
    message: CONFIRM_RELOAD_MESSAGE
  },
  'view': {
    icon: CONFIRM_VIEW_ICON,
    title: CONFIRM_ARE_YOU_SURE_TITLE,
    message: CONFIRM_VIEW_MESSAGE
  }
}

type ModalParams = {
  icon: string,
  title: string,
  message: string,
  onConfirm: () => void,
  onCancel: () => void
}

type State = {
  modal: ModalParams | null
}

class EditorToolbar extends React.Component<Props, State> {
  state = {
    modal: null
  }

  refreshDocument = () => {
    const { resourceId, isModified, getResource, resetDocumentChanges } = this.props
    if (!isModified) {
      getResource(resourceId)
    } else {
      const modal: ModalParams = {
        ...ACTIONS['refresh'],
        onConfirm: () => {
          getResource(resourceId)
          resetDocumentChanges()
          this.setState({ modal: null })
        },
        onCancel: () => this.setState({ modal: null })
      }
      this.setState({
        modal
      })
    }
  }

  deleteDocument = () => {
    const { resource, deleteAndRefresh } = this.props
    const modal: ModalParams = {
      ...ACTIONS['delete'],
      onConfirm: () => {
        deleteAndRefresh(resource)
      },
      onCancel: () => this.setState({ modal: null })
    }
    this.setState({
      modal
    })
  }

  handleDocumentSave = () => {
    const { modifiedDocument, resourceId, saveDocument, isModified } = this.props
    if (isModified) {
      saveDocument(resourceId, modifiedDocument)
    }
  }

  updateDocumentName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { resourceId, resource: { updated_at }, updateDocumentName } = this.props
    updateDocumentName(resourceId, event.target.value, updated_at)
  }

  viewDocument = () => {
    const { resourceId, isModified, navigate } = this.props
    if (!isModified) {
      navigate('/view/' + resourceId)
    } else {
      this.setState({
        modal: {
          ...ACTIONS['view'],
          onConfirm: () => {
            navigate('/view/' + resourceId)
          },
          onCancel: () => this.setState({ modal: null })
        }
      })
    }
  }

  render() {
    const {
      resourceId,
      resource,
      isModified,
      deleting,
      saving,
      refreshing,
      modifiedDocument
    } = this.props
    const { modal } = this.state
    const commonProps = {
      refreshDocument: this.refreshDocument,
      updateDocument: this.handleDocumentSave,
      deleteDocument: this.deleteDocument,
      onNameChange: this.updateDocumentName,
      viewDocument: this.viewDocument,
      saveDisabled: !isModified,
      resource,
      deleting,
      saving,
      refreshing,
      resourceId
    }
    const document = { ...resource, ...modifiedDocument }
    return (
      <>
        <EditorToolbarView
          title={document.name}
          folderUrl={'/folder/' + document.folder}
          {...commonProps}
        />
        {modal &&
          < ConfirmationModal {...modal} />
        }
      </>
    )
  }
}

const mapStateToProps = ({ model, state, ui }: RootState, ownProps: RouterProvidedProps) => {
  const { modifiedDocument, isModified } = state.editor
  const { editorToolbar } = ui.page
  return {
    ...selectApiResource(model.documents, ownProps.match.params.documentId),
    isModified,
    modifiedDocument,
    ...editorToolbar
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, {}, Action>) => {
  return {
    ...mapGetResource(dispatch, getDocument),
    resetDocumentChanges: () => dispatch(resetDocumentChanges(undefined)),
    saveDocument: (id: ApiResourceId, resource: PartialTextDocument) => updateDocument(dispatch, { id, resource }),
    updateDocumentName: (id: ApiResourceId, name: string, updated: string) => dispatch(modifyDocument({ id, modifications: { name, updated_at: updated } })),
    deleteAndRefresh: (document: TextDocument) => {
      dispatch(deleteAndRefresh({ resource: document }))
    },
    navigate: (route: string) => dispatch(push(route))
  }
}
const wrappedComponent = createApiResourceWrapper<TextDocument, Props>(isDocument)(EditorToolbar, ToolbarLoadingView, ToolbarNotFound, ToolbarError)

export default connect(mapStateToProps, mapDispatchToProps)(wrappedComponent)
