import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { RootState } from '../reducer'
import { resetDocumentChanges, deleteAndRefresh } from 'actions/editor-actions'
import { updateDocument, getDocument } from 'actions/document-actions'
import { ApiResource } from 'service/common'
import { TextDocument, PartialTextDocument, TextDocumentId } from 'service/document-service'

export type Props = {
  getDocument: (id: TextDocumentId) => Promise<TextDocument>,
  updateDocument: (id: TextDocumentId, document: PartialTextDocument) => any,
  resetDocumentChanges: () => any,
  deleteAndRefresh: (id: TextDocumentId) => any,
  documentId: string,
  document: ApiResource<TextDocument>,
  modifiedContent: string | null
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

  updatedocument = () => {
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
    return (
      <div className='ui item'>
        <i onClick={this.refreshDocument} className='ui icon refresh text outline' />
        <i onClick={this.updatedocument} className='ui icon save text outline' />
        <i onClick={this.deleteDocument} className='ui icon delete text outline' />
      </div>
    )
  }
}

const mapStateToProps = ({ model, state }: RootState, ownProps: any) => {
  const documentId: TextDocumentId = ownProps.match.params.documentId
  const document: ApiResource<TextDocument> | undefined = model.documents.byId[documentId]
  const modifiedContent = state.editor.modifiedContent
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