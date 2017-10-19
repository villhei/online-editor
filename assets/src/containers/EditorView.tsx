import * as React from 'react'
import Editor from './Editor'

const mock: string[] = ['cats', 'shopping', 'turtles', 'toys', 'todo']

export default class EditorView extends React.Component<any, any> {
  render () {
    return (<div className='ui equal full height row '>
      <div className='ui twelve wide centered column without padding'>
        <Editor />
      </div>
    </div>)
  }
}
