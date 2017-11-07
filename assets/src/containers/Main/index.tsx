import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect, Dispatch } from 'react-redux'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import FileList from './components/FileList'
import EditorContainer from '../EditorContainer'
import OtherView from '../OtherView'
import { RootState } from '../../reducer'
import { TextDocument } from 'service/document-service'
import { getDocuments } from 'actions/document-actions'

type MainProps = {
  documents: RootState['model']['documents']['all'],
  getDocuments: () => any
}

const ConnectedSwitch = connect(({ ui }: RootState): any => {
  return {
    location: ui.router.location
  }
})(Switch)

class Main extends React.Component<MainProps, any> {
  componentDidMount() {
    this.props.getDocuments()
  }

  render() {
    const { documents } = this.props
    return (<div className='ui full height'>
      <Navigation documents={documents} />
      <div className='ui padded equal full height grid'>
        <ConnectedSwitch>
          <Route exact path='/' render={() =>
            <FileList documents={documents}
            />} />
          <Route path='/edit' component={EditorContainer} />
          <Route path='/other' component={OtherView} />
        </ConnectedSwitch>
      </div>
    </div>)
  }
}

const mapStateToProps = ({ model }: RootState) => {
  return {
    documents: model.documents.all
  }
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => {
  return {
    getDocuments: () => getDocuments(dispatch, undefined)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main)