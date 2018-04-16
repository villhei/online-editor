import { getDocument } from 'actions/document-actions'
import { resetDocumentChanges, updatedocumentContent } from 'actions/editor-actions'
// tslint:disable-next-line:no-import-side-effect
import 'codemirror/mode/markdown/markdown'
import Loading from 'components/Loading'
import wrapApiResource from 'containers/ApiResourceHOC'
import * as React from 'react'
import { Controlled as CodeMirror } from 'react-codemirror2'
import { Dispatch, connect } from 'react-redux'
import { ApiResource, ApiResourceId } from 'service/common'
import { TextDocument, isDocument } from 'service/document-service'

import { RootState } from '../reducer'

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
      onBeforeChange={(editor, data, value) => {
        updateDocumentContent(value)
      }}
      options={{
        ...EDITOR_OPTIONS,
        readOnly: saving
      }} />
  }
}

const mapStateToProps = ({ model, state, ui }: RootState, ownProps: any) => {
  const resourceId: ApiResourceId = ownProps.match.params.documentId
  const resource: ApiResource<TextDocument> = model.documents.byId[resourceId]
  const { modifiedContent } = state.editor
  const { saving } = ui.page.editorToolbar
  return {
    resource,
    resourceId,
    modifiedContent,
    saving
  }
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => {
  return {
    getResource: (id: string) => getDocument(dispatch, { id }),
    updateDocumentContent: (value: string) => dispatch(updatedocumentContent({ value })),
    resetDocumentChanges: () => dispatch(resetDocumentChanges(undefined))
  }
}

const wrappedResource = wrapApiResource<TextDocument, EditorProps>(isDocument)(Editor, Loading)
export default connect(mapStateToProps, mapDispatchToProps)(wrappedResource)
