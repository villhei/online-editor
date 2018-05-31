import { getDocument } from 'actions/document-actions'
import { resetDocumentChanges, updatedocumentContent } from 'actions/editor-actions'
// tslint:disable-next-line:no-import-side-effect
import 'codemirror/mode/markdown/markdown'
import Loading from 'components/Loading'
import wrapApiResource, { mapGetResource, selectApiResource } from 'containers/ApiResourceHOC'
import * as React from 'react'
import { Controlled as CodeMirror } from 'react-codemirror2'
import { Dispatch, connect } from 'react-redux'
import { ApiResourceId } from 'service/common'
import { PartialTextDocument, TextDocument, isDocument } from 'service/document-service'

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
  updateDocumentContent: (value: string) => void,
  resetDocumentChanges: () => void,
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

  render() {
    const { resource, updateDocumentContent, modifiedContent, saving } = this.props
    return <CodeMirror
      className='ui full height without padding'
      autoFocus={true}
      value={modifiedContent || resource.content}
      onBeforeChange={(_editor, _data, value) => {
        updateDocumentContent(value)
      }}
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
  const { saving } = state.ui.page.editorToolbar
  const content = isModified(modifiedDocument) ? modifiedDocument.content : undefined
  return {
    ...selectApiResource(state, 'documents', resourceId),
    modifiedContent: content,
    saving
  }
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => {
  return {
    ...mapGetResource(dispatch, getDocument),
    updateDocumentContent: (value: string) => dispatch(updatedocumentContent({ value })),
    resetDocumentChanges: () => dispatch(resetDocumentChanges(undefined))
  }
}

const wrappedResource = wrapApiResource<TextDocument, EditorProps>(isDocument)(Editor, Loading)
export default connect(mapStateToProps, mapDispatchToProps)(wrappedResource)
