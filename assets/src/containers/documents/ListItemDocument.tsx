import DocumentItem from 'components/lists/DocumentItem'
import ListItem from 'containers/lists/ListItem'
import * as React from 'react'
import { TextDocument } from 'service/document-service'

type Props = {
  selected: boolean,
  resource: TextDocument,
  onSelect: (resource: TextDocument) => void,
  onClick: (resource: TextDocument) => void
}

export default class ListItemDocument extends ListItem<TextDocument, Props> {
  render() {
    const { selected, resource } = this.props
    return (
      <DocumentItem
        resource={resource}
        selected={selected}
        onClick={this.handleOnClick}
        onSelect={this.handleOnSelect} />
    )
  }
}
