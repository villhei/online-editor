import { getDocument } from 'actions/document-actions'
import DocumentViewComponent from 'components/DocumentView'
import DocumentViewEmpty from 'components/DocumentViewEmpty'
import LoadingComponent from 'components/Loading'
import createApiResourceWrapper, { mapGetResource, selectApiResource } from 'library/containers/ApiResourceHOC'
import * as React from 'react'
import {
  Dispatch,
  connect
} from 'react-redux'
import { TextDocument, TextDocumentId, isDocument } from 'service/document-service'

import { RootState, RouterProvidedProps } from 'main/store'

export type DocumentViewProps = {
  getResource: (id: string) => Promise<TextDocument>,
  resourceId: string,
  resource: TextDocument
}

class DocumentView extends React.PureComponent<DocumentViewProps> {
  render() {
    const { resource } = this.props
    if (resource.content.length > 0) {
      return <DocumentViewComponent resource={resource} />
    } else {
      return <DocumentViewEmpty />
    }
  }
}

const mapStateToProps = (state: RootState, ownProps: RouterProvidedProps) => {
  const resourceId: TextDocumentId = ownProps.match.params.documentId
  return selectApiResource<TextDocument>(state.model.documents, resourceId)
}

const mapDispatchToProps = (dispatch: Dispatch) => mapGetResource(dispatch, getDocument)

const wrappedResource = createApiResourceWrapper<TextDocument, DocumentViewProps>(isDocument)(DocumentView, LoadingComponent)
export default connect(mapStateToProps, mapDispatchToProps)(wrappedResource)
