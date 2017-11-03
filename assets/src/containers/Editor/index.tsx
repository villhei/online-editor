import * as React from 'react'
import { Controlled as CodeMirror } from 'react-codemirror2'
import { connect, Dispatch } from 'react-redux'
import { RootState } from '../../reducer'
import { getDocument } from 'actions/document-actions'
import { TextDocument } from 'service/document-service'
import 'codemirror/mode/markdown/markdown'

const EDITOR_OPTIONS = {
  lineNumbers: true,
  mode: 'markdown',
  theme: 'material',
  lineWrapping: true,
  extraKeys: {
    'Shift-Tab': 'indentLess',
    'Tab': 'indentMore'
  }
}

export type EditorProps = {
  getDocument: (id: string | number) => Promise<TextDocument>,
  documentId: number,
  document: TextDocument
}

class Editor extends React.Component<EditorProps, any> {
  componentDidMount() {
    const { documentId, getDocument } = this.props
    getDocument(documentId)
  }

  render() {
    const { document } = this.props
    console.log('document', document)
    return <CodeMirror
      className='ui full height without padding'
      value={document ? document.content : ''}
      onBeforeChange={(editor, data, value) => {
        console.log('value', value)
      }}
      onChange={(editor, metadata, value) => {
        console.log(metadata)
      }}
      options={EDITOR_OPTIONS} />
  }
}

const mapStateToProps = (state: RootState, ownProps: any) => {
  const documentId: number = parseInt(ownProps.match.params.documentId) || 0
  const document: TextDocument = state.documents.byId[documentId]
  return {
    document,
    documentId
  }
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => {
  return {
    getDocument: (id: string | number) => getDocument(dispatch, { id })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor)