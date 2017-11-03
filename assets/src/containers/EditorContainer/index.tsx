import * as React from 'react'
import Editor from '../Editor'
import { RouteComponentProps } from 'react-router'
import { Route } from 'react-router-dom'

interface EditorViewRouteProps {
  url: string
  params: {
    doucmentId: string
  }
}

interface EditorViewProps extends RouteComponentProps<EditorViewRouteProps> { }

export default class EditorView extends React.Component<EditorViewProps, any> {
  render() {
    const { match } = this.props
    return (<div className='ui full height row without padding'>
      <div className='ui twelve wide centered column without padding'>
        <Route path={`${match.url}/:documentId`} component={Editor} />
        <Route exact path={match.url} render={() => (
          <h3>Please select something</h3>
        )} />
      </div>
    </div>)
  }
}
