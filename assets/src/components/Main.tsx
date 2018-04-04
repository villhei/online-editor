import * as React from 'react'
import ConnectedSwitch from 'containers/ConnectedSwitch'
import { Route } from 'react-router-dom'
import MainToolbar from 'containers/MainToolbar'
import EditorToolbar from 'containers/EditorToolbar'
import ViewToolbar from 'containers/ViewToolbar'
import DocumentList from 'containers/DocumentList'
import Editor from 'containers/Editor'
import DocumentView from 'containers/DocumentView'

type Props = {
  error: {
    message: string | undefined,
    stack: string | undefined
  },
  clearError: () => any
}

export default (props: Props) => {
  const { error, clearError } = props
  return (
    <div className='ui main full height with padding'>
      <div className='ui fixed borderless grid menu'>
        <ConnectedSwitch>
          <Route path={'/edit/:documentId'} component={EditorToolbar} />
          <Route path={'/view/:documentId'} component={ViewToolbar} />
          <Route path='/' component={MainToolbar} />
        </ConnectedSwitch>
      </div>
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
              <Route path={'/view/:documentId'} component={DocumentView} />
              <Route path={'/edit/:documentId'} component={Editor} />
              <Route exact path='/' component={DocumentList} />
            </ConnectedSwitch>
          </section>
        </div>
      </div>
    </div >
  )
}
