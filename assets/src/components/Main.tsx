import * as React from 'react'
import ConnectedSwitch from 'containers/ConnectedSwitch'
import { Route } from 'react-router-dom'
import { connect, Dispatch } from 'react-redux'
import Main from 'components/Main'
import MainToolbar from 'containers/MainToolbar'
import EditorToolbar from 'containers/EditorToolbar'
import ViewToolbar from 'containers/ViewToolbar'
import FileList from 'containers/FileList'
import Editor from 'containers/Editor'

import MarkdownView from 'containers/MarkdownView'
import { TextDocument } from 'service/document-service'

type Props = {
  documents: TextDocument[],
  error: {
    message: string | undefined,
    stack: string | undefined
  },
  clearError: () => any
}

export default (props: Props) => {
  const { documents, error, clearError } = props
  return (<div className='ui main full height with padding'>
    <ConnectedSwitch>
      <Route path={'/edit/:documentId'} component={EditorToolbar} />
      <Route path={'/view/:documentId'} component={ViewToolbar} />
      <Route path='/' component={MainToolbar} />
    </ConnectedSwitch>
    <div className='ui padded equal full height grid'>
      {error.message &&
        <div className='ui row'>
          <div className='ui sixteen wide orange nag column'>
            <span className='title'>{error.message}</span>
            <i onClick={clearError} className='close icon'></i>
          </div>
        </div>
      }
      <div className='ui full height row content'>
        <section className='ui twelve wide computer sixteen wide tablet centered column without padding'>
          <ConnectedSwitch>
            <Route path={'/view/:documentId'} component={MarkdownView} />
            <Route path={'/edit/:documentId'} component={Editor} />
            <Route exact path='/' component={FileList} />
          </ConnectedSwitch>
        </section>
      </div>
    </div>
  </div >)
}