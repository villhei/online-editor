import * as React from 'react'
import { Route } from 'react-router'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import EditorContainer from '../EditorContainer'
import OtherView from '../OtherView'

export default class Main extends React.Component<any, any> {
  render () {
    return (<div className='ui full height'>
      <Navigation />
      <div className='ui padded equal full height grid'>
        <Route exact path='/' render={() => <h1>Hello</h1>}/>
        <Route path='/edit' component={EditorContainer}/>
        <Route path='/other' component={OtherView}/>
      </div>
    </div>)
  }
}
