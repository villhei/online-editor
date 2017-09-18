import React from 'react'
import ReactDOM from 'react-dom'
import World from './world.tsx'

class HelloJSX extends React.Component {
  render () {
    var type = 'JSX'
    return (<h1>Hello from {type}!</h1>)
  }
}

export default function render (node) {
  ReactDOM.render(
    <div>
      <HelloJSX />
      <World />
    </div>,
    node
  )
}
