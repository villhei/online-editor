import * as React from 'react'
import * as ReactMarkdown from 'react-markdown'
import { connect, Dispatch } from 'react-redux'
import { RootState } from '../reducer'
import { getDocument } from 'actions/document-actions'
import { ApiResource } from 'service/common'
import { TextDocument, TextDocumentId, isDocument } from 'service/document-service'
import wrapApiResource, { ApiResourceProps } from 'containers/ApiResourceHOC'

export type MarkdownViewProps = {
  resource: TextDocument
}

class MarkdownView extends React.PureComponent<MarkdownViewProps> {
  render() {
    const { resource } = this.props
    return <div className='ui render container'>
      <ReactMarkdown source={resource.content} />
    </div>
  }
}


export default MarkdownView