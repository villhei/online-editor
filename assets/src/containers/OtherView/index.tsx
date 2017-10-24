import * as React from 'react'

const mock: string[] = ['cats', 'shopping', 'turtles', 'toys', 'todo']

export default class OtherView extends React.Component<any, any> {
  render() {
    return (<div className='ui equal full height row '>
      <div className='ui twelve wide centered column without padding'>
        <h1>Other view</h1>
        <ul>
          {mock.map((sillyString) => <li key={sillyString} >{sillyString}</li>)}
        </ul>
      </div>
    </div>)
  }
}
