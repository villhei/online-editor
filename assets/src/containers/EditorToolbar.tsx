import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { push } from 'react-router-redux'
import { RootState } from '../reducer'
import {
  expectConfirmAction,
  resetDocumentChanges,
  deleteAndRefresh,
  updateAndRefresh,
  updateDocumentName,
  ConfirmActionName
} from 'actions/editor-actions'
import { getDocument } from 'actions/document-actions'
import {
  ApiResource,
  isResourceAvailable,
  getResourceName
} from 'service/common'
import {
  TextDocument,
  PartialTextDocument,
  TextDocumentId,
  isDocument
} from 'service/document-service'
import EditorToolbarView from 'components/toolbars/Editor'
import Modal, { Props as ModalProps } from 'containers/Modal'

export type DispatchProps = {
  getDocument: (id: TextDocumentId) => Promise<TextDocument>,
  saveDocument: (id: TextDocumentId, document: PartialTextDocument) => any,
  resetDocumentChanges: () => any,
  deleteAndRefresh: (document: TextDocument) => any,
  updateDocumentName: (value: string) => any,
  navigate: (route: string) => any,
  expectConfirm: (action: ConfirmActionName) => any
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
  saving: boolean,
  confirmation: {
    action?: string
  }
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

class EditorToolbar extends React.Component<Props, any> {
  componentDidMount() {
    const { documentId, getDocument } = this.props
    getDocument(documentId)
  }

  getModalProps = (): ModalProps => {
    const { confirmation: { action } } = this.props
    const dismissModal = this.expectConfirm(undefined)
    switch (action) {
      case 'view': {
        return {
          ...ACTIONS['view'],
          onConfirm: this.viewDocument,
          onCancel: dismissModal
        }
      }
      case 'refresh': {
        return {
          ...ACTIONS['refresh'],
          onConfirm: this.refreshDocument,
          onCancel: dismissModal
        }
      }
      case 'delete': {
        return {
          ...ACTIONS['delete'],
          onConfirm: this.deleteDocument,
          onCancel: dismissModal
        }
      }
      default: {
        console.log('Unknown action', action)
        return {
          title: 'foo',
          icon: 'archive',
          message: 'what?',
          onConfirm: () => null,
          onCancel: dismissModal
        }
      }
    }
  }

  refreshDocument = () => {
    this.props.expectConfirm(undefined)
    this.props.getDocument(this.props.documentId)
    this.props.resetDocumentChanges()
  }

  deleteDocument = () => {
    const { document } = this.props
    if (isDocument(document)) {
      this.props.deleteAndRefresh(document)
    }
  }

  expectConfirm = (action: ConfirmActionName) => () => {
    this.props.expectConfirm(action)
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
    const { documentId, navigate } = this.props
    this.props.expectConfirm(undefined)
    navigate('/view/' + documentId)
  }

  render() {
    const {
      documentId,
      document,
      isModified,
      modifiedContent,
      modifiedName,
      updateDocumentName,
      deleting,
      saving,
      refreshing,
      confirmation
    } = this.props
    const commonProps = {
      refreshDocument: isModified ? this.expectConfirm('refresh') : this.refreshDocument,
      updateDocument: this.updateDocumentContent,
      deleteDocument: this.expectConfirm('delete'),
      updateDocumentName: this.updateDocumentName,
      viewDocument: isModified ? this.expectConfirm('view') : this.viewDocument,
      saveDisabled: !isModified,
      deleting,
      saving,
      refreshing,
      documentId
    }
    return <>
      <EditorToolbarView
        title={getResourceName(document, modifiedName)}
        disabled={!isResourceAvailable(document)}
        {...commonProps}
      />
      {confirmation.action &&
        <Modal {...this.getModalProps()} />
      }
    </>
  }
}

const mapStateToProps = ({ model, state, ui }: RootState, ownProps: any): StateProps => {
  const documentId: TextDocumentId = ownProps.match.params.documentId
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
    getDocument: (id: TextDocumentId) => getDocument(dispatch, { id }),
    resetDocumentChanges: () => dispatch(resetDocumentChanges(undefined)),
    saveDocument: (id: TextDocumentId, document: PartialTextDocument) => dispatch(updateAndRefresh({ id, document })),
    updateDocumentName: (name: string) => dispatch(updateDocumentName({ value: name })),
    deleteAndRefresh: (document: TextDocument) => {
      dispatch(deleteAndRefresh({ document }))
    },
    expectConfirm: (action: ConfirmActionName) => {
      dispatch(expectConfirmAction({ action }))
    },
    navigate: (route: string) => dispatch(push(route))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorToolbar)
