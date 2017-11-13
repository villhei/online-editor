import * as React from 'react'
import { Controlled as CodeMirror } from 'react-codemirror2'
import { connect, Dispatch } from 'react-redux'
import { RootState } from '../../reducer'
import { getDocument } from 'actions/document-actions'
import { updatedocumentContent } from 'actions/editor-actions'
import { TextDocument, TextDocumentId } from 'service/document-service'
import 'codemirror/mode/markdown/markdown'

const EDITOR_OPTIONS = {
  lineNumbers: true,
  mode: 'markdown',
  theme: 'default',
  lineWrapping: true,
  extraKeys: {
    'Shift-Tab': 'indentLess',
    'Tab': 'indentMore'
  }
}

export type EditorProps = {
  getDocument: (id: string) => Promise<TextDocument>,
  updatedocumentContent: (value: string) => any,
  documentId: string,
  documentValue: string
}

class Editor extends React.Component<EditorProps, any> {
  componentDidMount() {
    const { documentId, getDocument } = this.props
    getDocument(documentId)
  }

  render() {
    const { documentValue, updatedocumentContent } = this.props
    return <CodeMirror
      className='ui full height without padding'
      value={documentValue}
      onBeforeChange={(editor, data, value) => {
        updatedocumentContent(value)
      }}
      onChange={(editor, metadata, value) => {
      }}
      options={EDITOR_OPTIONS} />
  }
}

const mapStateToProps = ({ model, state }: RootState, ownProps: any) => {
  const documentId: TextDocumentId = ownProps.match.params.documentId
  const document: TextDocument | undefined = model.documents.byId[documentId]
  const documentValue = state.editor.modifiedContent || (document && document.content) || ''
  return {
    documentValue,
    documentId
  }
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => {
  return {
    getDocument: (id: string) => getDocument(dispatch, { id }),
    updatedocumentContent: (value: string) => dispatch(updatedocumentContent({ value }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor)