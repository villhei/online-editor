import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect, Dispatch } from 'react-redux'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import FileList from './components/FileList'
import EditorContainer from '../EditorContainer'
import { RootState } from '../../reducer'
import { TextDocument } from 'service/document-service'
import { getDocuments } from 'actions/document-actions'
import { toggleMenu, ToggleMenu } from 'actions/page-actions'


type MainProps = {
  documents: RootState['model']['documents']['all'],
  navigationOpen: boolean,
  getDocuments: () => any,
  toggleNavigation: () => any
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

  toggleFileList = () => {
    console.log('toggling')
    this.props.toggleNavigation()
  }

  render() {
    const { documents, navigationOpen } = this.props
    return (<div className='ui full height'>
      <Navigation documents={documents} showNavigation={navigationOpen} toggleNavigation={this.toggleFileList} />
      <div className='ui padded equal full height grid'>
        <ConnectedSwitch>
          <Route exact path='/' render={() =>
            <FileList documents={documents}
            />} />
          <Route path='/edit' component={EditorContainer} />
        </ConnectedSwitch>
      </div>
    </div>)
  }
}

const mapStateToProps = ({ model, ui }: RootState) => {
  return {
    documents: model.documents.all,
    navigationOpen: ui.page.navigationOpen
  }
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => {
  return {
    getDocuments: () => getDocuments(dispatch, undefined),
    toggleNavigation: (menu: string) => dispatch(toggleMenu({ menu: 'navigation' }))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main)