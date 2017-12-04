import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { RootState } from '../reducer'
import { resetDocumentChanges, deleteAndRefresh, updateAndRefresh, updateDocumentName } from 'actions/editor-actions'
import { getDocument } from 'actions/document-actions'
import { ApiResource, ResourceStatus } from 'service/common'
import { TextDocument, PartialTextDocument, TextDocumentId } from 'service/document-service'
import EditorToolbarView from 'components/toolbars/Editor'

export type Props = {
  getDocument: (id: TextDocumentId) => Promise<TextDocument>,
  updateDocument: (id: TextDocumentId, document: PartialTextDocument) => any,
  resetDocumentChanges: () => any,
  deleteAndRefresh: (id: TextDocumentId) => any,
  updateDocumentName: (value: string) => any,
  documentId: string,
  document: ApiResource<TextDocument>,
  modifiedContent: string | undefined,
  modifiedName: string | undefined,
  documents: Array<TextDocument>
}

class EditorToolbar extends React.Component<Props, any> {
  componentDidMount() {
    const { documentId, getDocument } = this.props
    getDocument(documentId)
  }

  refreshDocument = () => {
    this.props.getDocument(this.props.documentId)
    this.props.resetDocumentChanges()
  }

  deleteDocument = () => {
    this.props.deleteAndRefresh(this.props.documentId)
  }

  updateDocumentContent = () => {
    const { modifiedContent, modifiedName, document, documentId } = this.props
    if (document && (modifiedContent || modifiedName)) {
      const modifiedDocument = {
        content: modifiedContent,
        name: modifiedName
      }
      this.props.updateDocument(documentId, modifiedDocument)
    }
  }

  updateDocumentName = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.updateDocumentName(event.target.value)
  }

  render() {
    const { documentId, document, modifiedContent, modifiedName, updateDocumentName } = this.props
    const saveDisabled = Boolean(!document || !(modifiedContent || modifiedName))
    const commonProps = {
      refreshDocument: this.refreshDocument,
      updateDocument: this.updateDocumentContent,
      deleteDocument: this.deleteDocument,
      updateDocumentName: this.updateDocumentName,
      saveDisabled,
    }
    if (document === ResourceStatus.Loading) {
      return <EditorToolbarView
        title={'Loading...'}
        disabled={true}
        {...commonProps}
      />
    } else if (document === ResourceStatus.NotFound) {
      return <EditorToolbarView
        title={'Not found'}
        disabled={true}
        {...commonProps}
      />
    } else if (document && document.name) {
      return <EditorToolbarView
        title={modifiedName === undefined ? document.name : modifiedName}
        disabled={false}
        {...commonProps}
      />
    } else {
      return <EditorToolbarView
        title={'Error'}
        disabled={true}
        {...commonProps}
      />
    }
  }
}

const mapStateToProps = ({ model, state }: RootState, ownProps: any) => {
  const documentId: TextDocumentId = ownProps.match.params.documentId
  const document: ApiResource<TextDocument> | undefined = model.documents.byId[documentId]
  const { modifiedContent, modifiedName } = state.editor
  const { documents } = ownProps
  return {
    document,
    documentId,
    modifiedContent,
    modifiedName
  }
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => {
  return {
    getDocument: (id: TextDocumentId) => getDocument(dispatch, { id }),
    resetDocumentChanges: () => dispatch(resetDocumentChanges(undefined)),
    updateDocument: (id: TextDocumentId, document: PartialTextDocument) => dispatch(updateAndRefresh({ id, document })),
    updateDocumentName: (name: string) => dispatch(updateDocumentName({ value: name })),
    deleteAndRefresh: (id: TextDocumentId) => {
      dispatch(deleteAndRefresh({ id }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorToolbar)