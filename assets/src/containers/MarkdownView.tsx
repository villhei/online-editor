import * as React from 'react'
import * as ReactMarkdown from 'react-markdown'
import { connect, Dispatch } from 'react-redux'
import { RootState } from '../reducer'
import { getDocument } from 'actions/document-actions'
import { ApiResource } from 'service/common'
import { TextDocument, TextDocumentId, isDocument } from 'service/document-service'
import wrapApiResource, { ApiResourceProps } from 'containers/ApiResourceHOC'

export type MarkdownViewProps = {
  getResource: (id: string) => Promise<TextDocument>,
  resourceId: string,
  resource: TextDocument
}

class MarkdownView extends React.PureComponent<MarkdownViewProps> {
  render() {
    const { resource } = this.props
    return <ReactMarkdown source={resource.content} />
  }
}

const mapStateToProps = ({ model, state, ui }: RootState, ownProps: any) => {
  const resourceId: TextDocumentId = ownProps.match.params.documentId
  const resource: ApiResource<TextDocument> = model.documents.byId[resourceId]
  return {
    resource,
    resourceId,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => {
  return {
    getResource: (id: string) => getDocument(dispatch, { id })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)
  (wrapApiResource<TextDocument, MarkdownViewProps>(isDocument)(MarkdownView))