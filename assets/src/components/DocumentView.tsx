import * as React from 'react'
import * as ReactMarkdown from 'react-markdown'
import { TextDocument } from 'service/document-service'

export type MarkdownViewProps = {
  resource: TextDocument
}

class DocumentView extends React.PureComponent<MarkdownViewProps> {
  render() {
    const { resource } = this.props
    return <div className='ui container'>
      <div className='ui very padded segment'>
        <ReactMarkdown className='markdown' source={resource.content}/>
      </div>
    </div >
  }
}

export default DocumentView
