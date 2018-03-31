import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { push } from 'react-router-redux'
import { RootState } from '../reducer'
import {
  expectConfirmAction,
  resetDocumentChanges,
  deleteAndRefresh,
  updateAndRefresh,
  updateDocumentName
} from 'actions/editor-actions'
import { getDocument } from 'actions/document-actions'
import { setModalVisibility } from 'actions/page-actions'
import { ApiResource, ResourceStatus } from 'service/common'
import { TextDocument, PartialTextDocument, TextDocumentId, isDocument } from 'service/document-service'
import EditorToolbarView, { Props as ViewProps } from 'components/toolbars/Editor'

export type DispatchProps = {
  getDocument: (id: TextDocumentId) => Promise<TextDocument>,
  saveDocument: (id: TextDocumentId, document: PartialTextDocument) => any,
  resetDocumentChanges: () => any,
  deleteAndRefresh: (id: TextDocumentId) => any,
  updateDocumentName: (value: string) => any,
  navigate: (route: string) => any,
  expectConfirm: (action: ActionName, icon: string, title: string, message: string) => any,
}

export type ActionName = 'delete'

const CONFIRM_DELETE_ICON = 'trash'
const CONFIRM_DELETE_TITLE = 'Confirm deletion'
const CONFIRM_DELETE_MESSAGE = 'Are you sure you want to delete this document?'

export type StateProps = {
  documentId: string,
  document: ApiResource<TextDocument>,
  modifiedContent: string | undefined,
  modifiedName: string | undefined,
  deleting: boolean,
  refreshing: boolean,
  saving: boolean,
  confirmation: {
    confirmed: boolean,
    action?: string
  }
}
export type Props = DispatchProps & StateProps

class EditorToolbar extends React.Component<Props, any> {
  componentDidMount() {
    const { documentId, getDocument } = this.props
    getDocument(documentId)
  }

  componentDidUpdate() {
    const { confirmation: { action, confirmed } } = this.props
    if (action && confirmed) {
      switch (action) {
        case 'delete': {
          this.deleteDocument()
        }
        default: {
          console.log('Unknown action', action)
          return
        }
      }
    }
  }

  refreshDocument = () => {
    this.props.getDocument(this.props.documentId)
    this.props.resetDocumentChanges()
  }

  deleteDocument = () => {
    this.props.deleteAndRefresh(this.props.documentId)
  }

  promptConfirm = (action: ActionName) => () => {
    this.props.expectConfirm(
      action,
      CONFIRM_DELETE_ICON,
      CONFIRM_DELETE_TITLE,
      CONFIRM_DELETE_MESSAGE)
  }

  updateDocumentContent = () => {
    const { modifiedContent, modifiedName, document, documentId } = this.props
    if (isDocument(document) && (modifiedContent || modifiedName)) {
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
    navigate('/view/' + documentId)
  }

  render() {
    const {
      documentId,
      document,
      modifiedContent,
      modifiedName,
      updateDocumentName,
      deleting,
      saving,
      refreshing
    } = this.props
    const saveDisabled = Boolean(!document || !(modifiedContent || modifiedName))
    const commonProps = {
      refreshDocument: this.refreshDocument,
      updateDocument: this.updateDocumentContent,
      deleteDocument: this.promptConfirm('delete'),
      updateDocumentName: this.updateDocumentName,
      viewDocument: this.viewDocument,
      saveDisabled,
      deleting,
      saving,
      refreshing,
      documentId
    }
    return <>
      <EditorToolbarView
        title={getViewTitle(document, modifiedName)}
        disabled={getViewDisabledStatus(document)}
        {...commonProps}
      />
    </>
  }
}

function getViewDisabledStatus(document: ApiResource<TextDocument>): boolean {
  if (document === ResourceStatus.Loading) {
    return true
  } else if (document === ResourceStatus.NotFound) {
    return true
  } else if (document && document.name) {
    return false
  }
  return true
}

function getViewTitle(document: ApiResource<TextDocument>, modifiedName?: string): string {
  if (document === ResourceStatus.Loading) {
    return 'Loading...'
  } else if (document === ResourceStatus.NotFound) {
    return 'Not found'
  } else if (document && document.name) {
    return modifiedName || document.name
  } else {
    return 'Error'
  }
}

const mapStateToProps = ({ model, state, ui }: RootState, ownProps: any): StateProps => {
  const documentId: TextDocumentId = ownProps.match.params.documentId
  const document: ApiResource<TextDocument> | undefined = model.documents.byId[documentId]
  const { modifiedContent, modifiedName } = state.editor
  const { editorToolbar, modal } = ui.page
  return {
    document,
    documentId,
    modifiedContent,
    modifiedName,
    ...editorToolbar,

  }
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>): DispatchProps => {
  return {
    getDocument: (id: TextDocumentId) => getDocument(dispatch, { id }),
    resetDocumentChanges: () => dispatch(resetDocumentChanges(undefined)),
    saveDocument: (id: TextDocumentId, document: PartialTextDocument) => dispatch(updateAndRefresh({ id, document })),
    updateDocumentName: (name: string) => dispatch(updateDocumentName({ value: name })),
    deleteAndRefresh: (id: TextDocumentId) => {
      dispatch(deleteAndRefresh({ id }))
    },
    expectConfirm: (action: ActionName, icon: string, title: string, message: string) => {
      dispatch(expectConfirmAction({ action }))
      dispatch(setModalVisibility({ visible: true, icon, title, message }))
    },
    navigate: (route: string) => dispatch(push(route))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorToolbar)