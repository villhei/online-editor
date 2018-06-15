import { getDocument } from 'actions/document-actions'
import LoadingCard from 'components/LoadingCard'
import DocumentCardView from 'components/cards/DocumentCardView'
import createApiResourceWrapper, { selectApiResource } from 'library/containers/ApiResourceHOC'
import { mapGetResource } from 'library/containers/common'
import {
  HasId
} from 'library/service/common'
import * as React from 'react'
import {
  Dispatch,
  connect
} from 'react-redux'
import { push } from 'react-router-redux'
import {
  TextDocument,
  TextDocumentId,
  isDocument
} from 'service/document-service'

import { RootState } from 'main/store'

type OwnProps = {
  resourceId: TextDocumentId,
  selected: boolean,
  onResourceNotFound: (id: TextDocumentId) => void,
  onClick: (resource: HasId) => void
  selectDocument: (resource: HasId) => void
}

type Props = OwnProps & {
  resource: TextDocument,
  getResource: (id: TextDocumentId) => void
}

class DocumentCard extends React.Component<Props> {
  selectDocument = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    const { resource, selectDocument } = this.props
    selectDocument(resource)
  }
  handleOnClick = () => {
    const { resource, onClick } = this.props
    onClick(resource)
  }
  render() {
    const { resource, selected } = this.props
    return <DocumentCardView
      onClick={this.handleOnClick}
      selected={selected}
      document={resource}
      selectDocument={this.selectDocument} />
  }
}

const mapStateToProps = (state: RootState, ownProps: OwnProps) => {
  const { resourceId, selected, selectDocument } = ownProps
  return {
    ...selectApiResource<TextDocument>(state.model.documents, resourceId),
    selected,
    selectDocument
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    ...mapGetResource(dispatch, getDocument),
    editResource: (id: string) => dispatch(push('/edit/' + id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  createApiResourceWrapper<TextDocument, Props>(isDocument)(DocumentCard, LoadingCard))
