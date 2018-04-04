import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { RootState } from '../reducer'
import { getDocument } from 'actions/document-actions'
import { ApiResource } from 'service/common'
import LoadingComponent from 'components/Loading'
import DocumentViewComponent from 'components/DocumentView'
import { TextDocument, TextDocumentId, isDocument } from 'service/document-service'
import wrapApiResource from 'containers/ApiResourceHOC'

export type DocumentViewProps = {
  getResource: (id: string) => Promise<TextDocument>,
  resourceId: string,
  resource: TextDocument
}

class DocumentView extends React.PureComponent<DocumentViewProps> {
  render() {
    const { resource } = this.props
    return <DocumentViewComponent resource={resource} />
  }
}

const mapStateToProps = ({ model, state, ui }: RootState, ownProps: any) => {
  const resourceId: TextDocumentId = ownProps.match.params.documentId
  const resource: ApiResource<TextDocument> = model.documents.byId[resourceId]
  return {
    resource,
    resourceId
  }
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => {
  return {
    getResource: (id: string) => getDocument(dispatch, { id })
  }
}
const wrappedResource = wrapApiResource<TextDocument, DocumentViewProps>(isDocument)(DocumentView, LoadingComponent)
export default connect(mapStateToProps, mapDispatchToProps)(wrappedResource)
