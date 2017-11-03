import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect, Dispatch } from 'react-redux'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import EditorContainer from '../EditorContainer'
import OtherView from '../OtherView'
import { RootState } from '../../reducer'
import { TextDocument } from 'service/document-service'
import { getDocuments } from 'actions/document-actions'

type MainProps = {
  documents: RootState['documents']['all'],
  getDocuments: () => any
}

const ConnectedSwitch = connect((state: RootState): any => {
  return {
    location: state.router.location
  }
})(Switch)

class Main extends React.Component<MainProps, any> {
  componentDidMount() {
    console.log('get')
    this.props.getDocuments()
  }

  render() {
    return (<div className='ui full height'>
      <Navigation documents={this.props.documents} />
      <div className='ui padded equal full height grid'>
        <ConnectedSwitch>
          <Route exact path='/' render={() => <h1>Hello</h1>} />
          <Route path='/edit' component={EditorContainer} />
          <Route path='/other' component={OtherView} />
        </ConnectedSwitch>
      </div>
    </div>)
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    documents: state.documents.all
  }
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => {
  return {
    getDocuments: () => getDocuments(dispatch, undefined)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main)