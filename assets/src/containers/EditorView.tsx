import * as React from 'react'
import Editor from './Editor'

const mock: string[] = ['cats', 'shopping', 'turtles', 'toys', 'todo']

export default class EditorView extends React.Component<any, any> {
  render () {
    return (<div className='ui equal full height row '>
      <div className='ui three wide stretched grey column'>
        <h3>Your files</h3>
        <ul className='ui celled list'>
          {
            mock.map((item: string) => {
              return <div key={item} className='item'>{item}</div>
            })
          }
        </ul>
      </div>
      <div className='ui thirteen wide stretched blue column without padding'>
        <Editor />
      </div>
    </div>)
  }
}
