import * as React from 'react'
import * as CodeMirror from 'react-codemirror'
import 'codemirror/mode/markdown/markdown'

type EditorState = {
  text: string
}

const EDITOR_OPTIONS = {
  lineNumbers: true,
  mode: 'markdown',
  theme: 'material',
  extraKeys: {
    'Shift-Tab': 'indentLess',
    'Tab': 'indentMore'
  }
}

export default class Editor extends React.Component<any, EditorState> {
  state: EditorState = {
    text: ''
  }

  editor: ReactCodeMirror.ReactCodeMirror

  componentDidMount () {
    this.editor.getCodeMirror().setSize('100%', '100%')
  }

  updateText = (text: string) => {
    this.setState({
      text
    })
  }

  render () {
    return <CodeMirror
      ref={(node: ReactCodeMirror.ReactCodeMirror) => this.editor = node}
      className='ui full height'
      value={this.state.text}
      onChange={this.updateText}
      options={EDITOR_OPTIONS} />
  }
}
