import * as React from 'react'
import { Controlled as CodeMirror } from 'react-codemirror2'
import { connect, Dispatch } from 'react-redux'
import { RootState } from '../reducer'
import { getDocument } from 'actions/document-actions'
import { updatedocumentContent, resetDocumentChanges } from 'actions/editor-actions'
import { ApiResource } from 'service/common'
import { TextDocument, TextDocumentId, isDocument } from 'service/document-service'
import wrapApiResource, { ApiResourceProps } from 'containers/ApiResourceHOC'
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
  getResource: (id: string) => Promise<TextDocument>,
  updateDocumentContent: (value: string) => any,
  resetDocumentChanges: () => any,
  resourceId: string,
  resource: TextDocument,
  modifiedContent: string | undefined
}

class Editor extends React.PureComponent<EditorProps> {
  componentWillReceiveProps(nextProps: EditorProps) {
    if (nextProps.resourceId !== this.props.resourceId) {
      this.props.resetDocumentChanges()
    }
  }

  componentDidMount() {
    this.props.resetDocumentChanges()
  }

  render() {
    const { resource, updateDocumentContent, modifiedContent } = this.props
    return <CodeMirror
      className='ui full height without padding'
      autoFocus={true}
      value={modifiedContent || resource.content}
      onBeforeChange={(editor, data, value) => {
        updateDocumentContent(value)
      }}
      onChange={(editor, metadata, value) => {
      }}
      options={EDITOR_OPTIONS} />
  }
}

const mapStateToProps = ({ model, state }: RootState, ownProps: any) => {
  const resourceId: TextDocumentId = ownProps.match.params.documentId
  const resource: ApiResource<TextDocument> = model.documents.byId[resourceId]
  const { modifiedContent } = state.editor
  return {
    resource,
    resourceId,
    modifiedContent
  }
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => {
  return {
    getResource: (id: string) => getDocument(dispatch, { id }),
    updateDocumentContent: (value: string) => dispatch(updatedocumentContent({ value })),
    resetDocumentChanges: () => dispatch(resetDocumentChanges(undefined))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)
  (wrapApiResource<TextDocument, EditorProps>(isDocument)(Editor))