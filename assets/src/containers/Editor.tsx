import { getDocument, updateDocument } from 'actions/document-actions'
import { modifyDocument, resetDocumentChanges } from 'actions/editor-actions'
// tslint:disable-next-line:no-import-side-effect
import 'codemirror/mode/markdown/markdown'
import Loading from 'components/Loading'
import NotFound from 'components/NotFound'
import createApiResourceWrapper, { selectApiResource } from 'library/containers/ApiResourceHOC'
import { mapGetResource } from 'library/containers/common'
import { ApiResourceId } from 'library/service/common'
import * as React from 'react'
import { Controlled as CodeMirror, IInstance } from 'react-codemirror2'
import { Dispatch, connect } from 'react-redux'
import { PartialTextDocument, TextDocument, TextDocumentId, isDocument } from 'service/document-service'

import { RootState, RouterProvidedProps } from 'main/store'

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
  updateDocumentContent: (id: TextDocumentId, value: string, updated: string) => void,
  resetDocumentChanges: () => void,
  updateDocument: (id: TextDocumentId, resource: PartialTextDocument, updated: string) => void,
  resourceId: string,
  resource: TextDocument,
  saving: boolean,
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

  handleDocumentChange = (_editor: IInstance, _data: CodeMirror.EditorChange, value: string) => {
    const { updateDocumentContent, resourceId, resource: { updated_at } } = this.props
    updateDocumentContent(resourceId, value, updated_at)
  }

  render() {
    const { resource, modifiedContent, saving } = this.props
    return <CodeMirror
      className='ui full height without padding'
      value={modifiedContent || resource.content}
      onBeforeChange={this.handleDocumentChange}
      options={{
        ...EDITOR_OPTIONS,
        readOnly: saving
      }} />
  }
}

function isModified(modifiedDocument: PartialTextDocument | null): modifiedDocument is { content: string } {
  return Boolean(modifiedDocument && typeof modifiedDocument.content === 'string')
}

const mapStateToProps = (state: RootState, ownProps: RouterProvidedProps) => {
  const resourceId: ApiResourceId = ownProps.match.params.documentId
  const { modifiedDocument } = state.ui.editor
  const content = isModified(modifiedDocument) ? modifiedDocument.content : undefined
  const { saving } = state.ui.page.editorToolbar
  return {
    ...selectApiResource(state.model.documents, resourceId),
    modifiedContent: content,
    saving
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    ...mapGetResource(dispatch, getDocument),
    updateDocumentContent: (id: TextDocumentId, content: string, updated: string) => dispatch(modifyDocument({ id, modifications: { content, updated_at: updated } })),
    resetDocumentChanges: () => dispatch(resetDocumentChanges(undefined)),
    updateDocument: (id: TextDocumentId, resource: PartialTextDocument) => updateDocument(dispatch, { id, resource })
  }
}

const wrappedResource = createApiResourceWrapper<TextDocument, EditorProps>(isDocument)(Editor, Loading, NotFound)
export default connect(mapStateToProps, mapDispatchToProps)(wrappedResource)
