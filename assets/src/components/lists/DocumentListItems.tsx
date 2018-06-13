import ListItemDocument from 'containers/documents/ListItemDocument'

import {
  HasId,
  Map
} from 'library/service/common'
import * as React from 'react'
import {
  TextDocument,
  TextDocumentId
} from 'service/document-service'

interface Props {
  resources: Array<TextDocument>,
  selected: Map<HasId>,
  clickDocument: (resource: TextDocument) => void,
  onResourceNotFound: (id: TextDocumentId) => void,
  selectResource: (resource: TextDocument) => void
}

export default class DocumentListView extends React.Component<Props> {
  render() {
    const { resources,
      clickDocument,
      selectResource,
      selected
    } = this.props
    return (
      <>
        {resources.map((document) => {
          const isSelected: boolean = Boolean(selected[document.id])
          return < ListItemDocument
            key={document.id}
            selected={isSelected}
            resource={document}
            onClick={clickDocument}
            onSelect={selectResource} />
        })}
      </>
    )
  }
}
