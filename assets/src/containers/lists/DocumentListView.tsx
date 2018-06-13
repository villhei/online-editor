import { getDocument } from 'actions/document-actions'
import LoadingComponent from 'components/Loading'
import DocumentListViewComponent from 'components/lists/DocumentListItems'
import createApiResourceListWrapper from 'library/containers/ApiResourceListHOC'
import { ResourceMap } from 'library/reducers/common'
import {
  HasId,
  Map
} from 'library/service/common'
import { RootState } from 'main/store'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import {
  TextDocument,
  TextDocumentId,
  isDocument
} from 'service/document-service'

type OwnProps = {
  resourceIds: Array<TextDocumentId>,
  selected: Map<HasId>,
  selectResource: (resource: TextDocument) => void,
  clickDocument: (resource: TextDocument) => void,
  onResourceNotFound: (id: TextDocumentId) => void
}

type Props = OwnProps & {
  resources: Array<TextDocument>,
  getResource: (id: TextDocumentId) => void
}

class DocumentListView extends React.Component<Props> {
  render() {
    return <DocumentListViewComponent {...this.props} />
  }
}
const mapStateToProps = (state: RootState, ownProps: OwnProps) => {
  const { resourceIds } = ownProps
  const resources: ResourceMap<TextDocument> = resourceIds.reduce((acc, id) => ({
    ...acc,
    [id]: state.model.documents.byId[id]
  }), {})
  return {
    resources
  }
}

type DispatchMappedProps = {
  getResource: (id: TextDocumentId) => void
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchMappedProps => {
  return {
    getResource: (id: TextDocumentId) => getDocument(dispatch, { id })
  }
}

const wrappedResource = createApiResourceListWrapper<TextDocument, Props>(isDocument)(DocumentListView, LoadingComponent)
export default connect(mapStateToProps, mapDispatchToProps)(wrappedResource)
