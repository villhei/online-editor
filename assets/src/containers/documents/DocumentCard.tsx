import { getDocument } from 'actions/document-actions'
import LoadingCard from 'components/LoadingCard'
import DocumentCardView from 'components/cards/DocumentCardView'
import wrapApiResource, { mapGetResource, selectApiResource } from 'containers/ApiResourceHOC'
import * as React from 'react'
import {
  Dispatch,
  connect
} from 'react-redux'
import { push } from 'react-router-redux'
import {
  HasId
} from 'service/common'
import {
  TextDocument,
  TextDocumentId,
  isDocument
} from 'service/document-service'

import { RootState } from 'main/reducer'

type OwnProps = {
  resourceId: TextDocumentId,
  selected: boolean,
  onResourceNotFound: (id: TextDocumentId) => void,
  selectDocument: (resource: HasId) => void
}

type Props = OwnProps & {
  resource: TextDocument,
  getResource: (id: TextDocumentId) => void,
  editResource: (id: TextDocumentId) => void
}

class DocumentCard extends React.Component<Props> {
  editDocument = () => {
    const { resourceId, editResource } = this.props
    editResource(resourceId)
  }

  selectDocument = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    const { resource, selectDocument } = this.props
    selectDocument(resource)
  }
  render() {
    const { resource, selected } = this.props
    return <DocumentCardView
      selected={selected}
      document={resource}
      selectDocument={this.selectDocument}
      editDocument={this.editDocument} />
  }
}

const mapStateToProps = (state: RootState, ownProps: OwnProps) => {
  const { resourceId, selected, selectDocument } = ownProps
  return {
    ...selectApiResource<TextDocument>(state, 'documents', resourceId),
    selected,
    selectDocument
  }
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => {
  return {
    ...mapGetResource(dispatch, getDocument),
    editResource: (id: string) => dispatch(push('/edit/' + id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  wrapApiResource<TextDocument, Props>(isDocument)(DocumentCard, LoadingCard))
