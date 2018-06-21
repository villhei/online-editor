import { getDocument, updateDocument } from 'actions/document-actions'
import { resetDocumentChanges, updatedocumentContent } from 'actions/editor-actions'
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

const AUTOSAVE_TRIGGER_DELAY_MS = 3000

export type EditorProps = {
  getResource: (id: string) => Promise<TextDocument>,
  updateDocumentContent: (value: string) => void,
  resetDocumentChanges: () => void,
  updateDocument: (id: TextDocumentId, resource: PartialTextDocument) => void,
  resourceId: string,
  resource: TextDocument,
  saving: boolean,
  modifiedContent: string | undefined
}

class Editor extends React.PureComponent<EditorProps> {

  saveTimeout: number | null = null

  componentWillReceiveProps(nextProps: EditorProps) {
    if (nextProps.resourceId !== this.props.resourceId) {
      this.props.resetDocumentChanges()
    }
  }

  componentDidMount() {
    this.props.resetDocumentChanges()
  }

  handleDocumentChange = (_editor: IInstance, _data: CodeMirror.EditorChange, value: string) => {
    const { updateDocumentContent, updateDocument, resourceId, resource } = this.props
    updateDocumentContent(value)

    if (this.saveTimeout) {
      window.clearTimeout(this.saveTimeout)
    }

    this.saveTimeout = window.setTimeout(() => {
      updateDocument(resourceId, {
        content: value,
        updated_at: resource.updated_at
      })
      this.saveTimeout = null
    }, AUTOSAVE_TRIGGER_DELAY_MS)
  }

  render() {
    const { resource, modifiedContent, saving } = this.props
    return <CodeMirror
      className='ui full height without padding'
      autoFocus={true}
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
  const { modifiedDocument } = state.state.editor
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
    updateDocumentContent: (value: string) => dispatch(updatedocumentContent({ value })),
    resetDocumentChanges: () => dispatch(resetDocumentChanges(undefined)),
    updateDocument: (id: TextDocumentId, resource: PartialTextDocument) => updateDocument(dispatch, { id, resource })
  }
}

const wrappedResource = createApiResourceWrapper<TextDocument, EditorProps>(isDocument)(Editor, Loading, NotFound)
export default connect(mapStateToProps, mapDispatchToProps)(wrappedResource)
