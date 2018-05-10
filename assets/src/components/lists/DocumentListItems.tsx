import ListItemDocument from 'containers/documents/ListItemDocument'

import * as React from 'react'
import {
  ApiResourceId,
  HasId,
  Map
} from 'service/common'
import {
  TextDocument,
  TextDocumentId
} from 'service/document-service'

type Props = {
  documents: Array<ApiResourceId>,
  selected: Map<HasId>,
  clickDocument: (resource: TextDocument) => void,
  onResourceNotFound: (id: TextDocumentId) => void,
  selectResource: (resource: TextDocument) => void
}

export default class DocumentCardsLayoutView extends React.Component<Props> {
  render() {
    const { documents,
      clickDocument,
      selectResource,
      selected,
      onResourceNotFound
    } = this.props
    return (
      <>
        {documents.map((documentId) => (
          <ListItemDocument
            key={documentId}
            onResourceNotFound={onResourceNotFound}
            selected={Boolean(selected[documentId])}
            resourceId={documentId}
            onClick={clickDocument}
            onSelect={selectResource} />
        ))}
      </>
    )
  }
}
