import { getDocument } from 'actions/document-actions'
import {
  deleteAndRefresh,
  resetDocumentChanges,
  updateAndRefresh,
  updateDocumentName
} from 'actions/editor-actions'
import EditorToolbarView from 'components/toolbars/EditorToolbarView'
import ConfirmationModal from 'containers/modals/ConfirmationModal'
import * as React from 'react'
import { Dispatch, connect } from 'react-redux'
import { push } from 'react-router-redux'
import {
  ApiResource,
  ApiResourceId,
  getResourceName,
  isResourceAvailable
} from 'service/common'
import {
  PartialTextDocument,
  TextDocument,
  isDocument
} from 'service/document-service'

import { RootState, RouterProvidedProps } from 'main/reducer'

export type DispatchProps = {
  getDocument: (id: ApiResourceId) => void,
  saveDocument: (id: ApiResourceId, document: PartialTextDocument) => void,
  resetDocumentChanges: () => void,
  deleteAndRefresh: (document: TextDocument) => void,
  updateDocumentName: (value: string) => void,
  navigate: (route: string) => void
}

const CONFIRM_VIEW_ICON = 'share'
const CONFIRM_ARE_YOU_SURE_TITLE = 'Are you sure?'
const CONFIRM_VIEW_MESSAGE = 'You have unsaved changes. Viewing the document without saving will discard the changes.'

const CONFIRM_RELOAD_ICON = 'reload'
const CONFIRM_RELOAD_MESSAGE = 'You have unsaved changes. Reloading the document without saving will discard the changes.'

const CONFIRM_DELETE_ICON = 'trash'
const CONFIRM_DELETE_TITLE = 'Confirm deletion'
const CONFIRM_DELETE_MESSAGE = 'Are you sure you want to delete this document?'

export type StateProps = {
  documentId: string,
  document: ApiResource<TextDocument>,
  isModified: boolean,
  modifiedContent: string | undefined,
  modifiedName: string | undefined,
  deleting: boolean,
  refreshing: boolean,
  saving: boolean
}

export type Props = DispatchProps & StateProps

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
    const { documentId, isModified, getDocument, resetDocumentChanges } = this.props
    if (!isModified) {
      getDocument(documentId)
    } else {
      const modal: ModalParams = {
        ...ACTIONS['refresh'],
        onConfirm: () => {
          getDocument(documentId)
          resetDocumentChanges()
        },
        onCancel: () => this.setState({ modal: null })
      }
      this.setState({
        modal
      })
    }
  }

  deleteDocument = () => {
    const { document, deleteAndRefresh } = this.props
    if (isDocument(document)) {
      const modal: ModalParams = {
        ...ACTIONS['delete'],
        onConfirm: () => {
          deleteAndRefresh(document)
        },
        onCancel: () => this.setState({ modal: null })
      }
      this.setState({
        modal
      })
    }
  }

  updateDocumentContent = () => {
    const { isModified, document, documentId, modifiedName, modifiedContent } = this.props
    if (isDocument(document) && isModified) {
      const modifiedDocument = {
        content: modifiedContent,
        name: modifiedName,
        updated_at: document.updated_at
      }
      this.props.saveDocument(documentId, modifiedDocument)
    }
  }

  updateDocumentName = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.updateDocumentName(event.target.value)
  }

  viewDocument = () => {
    const { documentId, isModified, navigate } = this.props
    if (!isModified) {
      navigate('/view/' + documentId)
    } else {
      this.setState({
        modal: {
          ...ACTIONS['view'],
          onConfirm: () => {
            navigate('/view/' + documentId)
          },
          onCancel: () => this.setState({ modal: null })
        }
      })
    }
  }

  render() {
    const {
      documentId,
      document,
      isModified,
      modifiedName,
      deleting,
      saving,
      refreshing
    } = this.props
    const { modal } = this.state
    const commonProps = {
      refreshDocument: this.refreshDocument,
      updateDocument: this.updateDocumentContent,
      deleteDocument: this.deleteDocument,
      updateDocumentName: this.updateDocumentName,
      viewDocument: this.viewDocument,
      saveDisabled: !isModified,
      deleting,
      saving,
      refreshing,
      documentId
    }
    const resourceName = modifiedName !== undefined ? modifiedName : getResourceName(document)
    return (
      <>
        <EditorToolbarView
          title={resourceName}
          disabled={!isResourceAvailable(document)}
          {...commonProps}
        />
        {modal &&
          < ConfirmationModal {...modal} />
        }
      </>
    )
  }
}

const mapStateToProps = ({ model, state, ui }: RootState, ownProps: RouterProvidedProps): StateProps => {
  const documentId: ApiResourceId = ownProps.match.params.documentId
  const document: ApiResource<TextDocument> | undefined = model.documents.byId[documentId]
  const { modifiedContent, modifiedName } = state.editor
  const { editorToolbar } = ui.page
  const isModified = Boolean(document && (modifiedContent || modifiedName))
  return {
    document,
    documentId,
    isModified,
    modifiedName,
    modifiedContent,
    ...editorToolbar
  }
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>): DispatchProps => {
  return {
    getDocument: (id: ApiResourceId) => getDocument(dispatch, { id }),
    resetDocumentChanges: () => dispatch(resetDocumentChanges(undefined)),
    saveDocument: (id: ApiResourceId, resource: PartialTextDocument) => dispatch(updateAndRefresh({ id, resource })),
    updateDocumentName: (name: string) => dispatch(updateDocumentName({ value: name })),
    deleteAndRefresh: (document: TextDocument) => {
      dispatch(deleteAndRefresh({ resource: document }))
    },
    navigate: (route: string) => dispatch(push(route))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorToolbar)
