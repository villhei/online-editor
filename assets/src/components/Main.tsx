import * as React from 'react'
import ConnectedSwitch from 'containers/ConnectedSwitch'
import { Route } from 'react-router-dom'
import { connect, Dispatch } from 'react-redux'
import Main from 'components/Main'
import Navigation from 'components/Navigation'
import EditorToolbar from 'containers/EditorToolbar'
import FileList from 'containers/FileList'
import Editor from 'containers/Editor'
import { TextDocument } from 'service/document-service'

type Props = {
  documents: TextDocument[],
  navigationOpen: boolean,
  toggleNavigation: () => any
}

export default (props: Props) => {
  const { documents, navigationOpen, toggleNavigation } = props
  return <div className='ui main full height with padding'>
    <Navigation documents={documents}
      showNavigation={navigationOpen}
      toggleNavigation={toggleNavigation} >
      <ConnectedSwitch>
        <Route path={'/edit/:documentId'} component={EditorToolbar} />
      </ConnectedSwitch>
    </Navigation>
    <div className='ui padded equal full height grid'>
      <div className='ui full height row'>
        <section className='ui twelve wide computer sixteen wide tablet centered column without padding'>
          <ConnectedSwitch>
            <Route path={'/edit/:documentId'} component={Editor} />
            <Route exact path='/' component={FileList} />
          </ConnectedSwitch>
        </section>
      </div>
    </div>
  </div >
}