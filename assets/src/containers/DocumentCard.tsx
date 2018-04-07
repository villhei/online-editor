import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { push } from 'react-router-redux'
import wrapApiResource from 'containers/ApiResourceHOC'
import { ApiResource } from 'service/common'
import { getDocument } from 'actions/document-actions'
import { TextDocumentId, TextDocument, isDocument } from 'service/document-service'
import { RootState } from '../reducer'
import DocumentCardView from 'components/cards/DocumentCardView'
import LoadingCard from 'components/LoadingCard'

type Props = {
  resourceId: TextDocumentId,
  resource: TextDocument,
  getResource: (id: TextDocumentId) => any,
  editResource: (id: TextDocumentId) => any
}

class DocumentCard extends React.Component<Props> {
  editDocument = () => {
    const { resourceId, editResource } = this.props
    editResource(resourceId)
  }
  render() {
    const document = this.props.resource
    return <DocumentCardView document={document} editDocument={this.editDocument} />
  }
}

const mapStateToProps = ({ model, state, ui }: RootState, ownProps: { resourceId: TextDocumentId }) => {
  const { resourceId } = ownProps
  const resource: ApiResource<TextDocument> = model.documents.byId[resourceId]
  return {
    resource,
    resourceId
  }
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => {
  return {
    getResource: (id: string) => getDocument(dispatch, { id }),
    editResource: (id: string) => dispatch(push('/edit/' + id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  wrapApiResource<TextDocument, Props>(isDocument)(DocumentCard, LoadingCard))
