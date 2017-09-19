import * as React from 'react'
import Editor from './Editor'

export default class EditorView extends React.Component<any, any> {
  render () {
    return (<div className='ui equal full height row '>
      <div className='ui three wide stretched grey column'>fafs</div>
      <div className='ui thirteen wide stretched blue column without padding'>
        <Editor />
      </div>
    </div>)
  }
}
