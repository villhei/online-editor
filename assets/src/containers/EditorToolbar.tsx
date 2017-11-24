import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { RootState } from '../reducer'
import { resetDocumentChanges } from 'actions/editor-actions'
import { updateDocument, getDocument } from 'actions/document-actions'
import { TextDocument, TextDocumentId } from 'service/document-service'

export type Props = {
  getDocument: (id: TextDocumentId) => Promise<TextDocument>,
  updateDocument: (document: TextDocument) => any,
  resetDocumentChanges: () => any,
  documentId: string,
  document: TextDocument,
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

  updatedocument = () => {
    const { modifiedContent, document } = this.props
    if (modifiedContent && document) {
      const modifiedDocument = {
        ...document,
        content: modifiedContent
      }
      this.props.updateDocument(modifiedDocument)
    }
  }

  render() {
    const { documentId, document, modifiedContent } = this.props
    const saveDisabled = Boolean(!document || !modifiedContent)
    return (
      <div className='ui item'>
        <i onClick={this.refreshDocument} className='ui icon refresh text outline' />
        <i onClick={this.updatedocument} className='ui icon save text outline' />
        <i className='ui icon delete text outline' />
      </div>
    )
  }
}

const mapStateToProps = ({ model, state }: RootState, ownProps: any) => {
  const documentId: TextDocumentId = ownProps.match.params.documentId
  const document: TextDocument | undefined = model.documents.byId[documentId]
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
    updateDocument: (document: TextDocument) => updateDocument(dispatch, document)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorActions)