import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import wrapApiResouce from 'containers/ApiResourceHOC'
import { ApiResource } from 'service/common'
import { getDocument } from 'actions/document-actions'
import { TextDocumentId, TextDocument, isDocument } from 'service/document-service'
import { RootState } from '../reducer'
import LoadingCard from 'components/LoadingCard'

type Props = {
  resourceId: TextDocumentId,
  resource: TextDocument,
  getResource: (id: TextDocumentId) => any
}

class DocumentCard extends React.Component<Props> {
  render() {
    const document = this.props.resource
    return (
      <Link className='ui padded card' key={document.id} to={`/edit/${document.id}`} >
        <div className='ui left aligned small header'><i className='file icon' />{document.name}</div>
        <div className='ui divider' />
      </Link>
    )
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
    getResource: (id: string) => getDocument(dispatch, { id })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(wrapApiResouce(isDocument)(DocumentCard, LoadingCard))
