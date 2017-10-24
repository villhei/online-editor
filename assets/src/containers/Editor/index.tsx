import * as React from 'react'
import { UnControlled as CodeMirror } from 'react-codemirror2'
import { getFileByName } from 'service/file-service'
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

export interface EditorProps {
  match: {
    params: {
      file: string
    }
  }
}

export default class Editor extends React.Component<EditorProps, any> {
  getFileContents(fileName: string): string {
    const file = getFileByName(fileName)
    if (file) {
      return file.content
    }
    return ''
  }

  render() {
    const editorValue = this.getFileContents(this.props.match.params.file)
    return <CodeMirror
      className='ui full height without padding'
      value={editorValue}
      onChange={(editor, metadata, value) => {
        console.log(metadata)
      }}
      options={EDITOR_OPTIONS} />
  }
}
