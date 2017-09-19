import * as React from 'react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import Editor from './Editor'

export default class Main extends React.Component<any, any> {
  render () {
    return (<div className='ui full height'>
      <Navigation />
      <div className='ui padded equal full height grid'>
        <Editor />
      </div>
      <Footer />
    </div>)
  }
}
