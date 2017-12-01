import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { RootState } from '../reducer'
import { resetDocumentChanges, deleteAndRefresh } from 'actions/editor-actions'
import { updateDocument, getDocument } from 'actions/document-actions'
import { ApiResource, ResourceStatus } from 'service/common'
import { TextDocument, PartialTextDocument, TextDocumentId } from 'service/document-service'
import EditorToolbar from 'components/toolbars/Editor'

export type Props = {
  getDocument: (id: TextDocumentId) => Promise<TextDocument>,
  updateDocument: (id: TextDocumentId, document: PartialTextDocument) => any,
  resetDocumentChanges: () => any,
  deleteAndRefresh: (id: TextDocumentId) => any,
  documentId: string,
  document: ApiResource<TextDocument>,
  modifiedContent: string | null,
  documents: Array<TextDocument>
}

class EditorActions extends React.Component<Props, any> {
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

  updateDocument = () => {
    const { modifiedContent, document, documentId } = this.props
    if (modifiedContent && document) {
      const modifiedDocument = {
        content: modifiedContent
      }
      this.props.updateDocument(documentId, modifiedDocument)
    }
  }

  render() {
    const { documentId, document, modifiedContent } = this.props
    const saveDisabled = Boolean(!document || !modifiedContent)
    const commonProps = {
      refreshDocument: this.refreshDocument,
      updateDocument: this.updateDocument,
      deleteDocument: this.deleteDocument
    }
    if (document === ResourceStatus.Loading) {
      return <EditorToolbar
        title={'Loading...'}
        {...commonProps}
      />
    } else if (document === ResourceStatus.NotFound) {
      return <EditorToolbar
        title={'Not found'}
        {...commonProps}
      />
    } else if (document.name) {
      return <EditorToolbar
        title={document.name}
        {...commonProps}
      />
    } else {
      return <EditorToolbar
        title={'Error'}
        {...commonProps}
      />
    }
  }
}

const mapStateToProps = ({ model, state }: RootState, ownProps: any) => {
  const documentId: TextDocumentId = ownProps.match.params.documentId
  const document: ApiResource<TextDocument> | undefined = model.documents.byId[documentId]
  const modifiedContent = state.editor.modifiedContent
  const { documents } = ownProps
  return {
    document,
    documentId,
    modifiedContent
  }
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => {
  return {
    getDocument: (id: TextDocumentId) => getDocument(dispatch, { id }),
    resetDocumentChanges: () => dispatch(resetDocumentChanges(undefined)),
    updateDocument: (id: TextDocumentId, document: PartialTextDocument) => updateDocument(dispatch, { id, document }),
    deleteAndRefresh: (id: TextDocumentId) => {
      dispatch(deleteAndRefresh({ id }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorActions)