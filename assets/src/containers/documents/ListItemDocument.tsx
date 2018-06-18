import DocumentItem from 'components/lists/DocumentItem'
import ListItem from 'containers/lists/ListItem'
import * as React from 'react'
import { TextDocument } from 'service/document-service'

interface Props {
  selected: boolean,
  resource: TextDocument,
  disabled: boolean,
  onSelect: (resource: TextDocument) => void,
  onClick: (resource: TextDocument) => void,
  onClickIcon: (resouce: TextDocument) => void
}

export default class ListItemDocument extends ListItem<TextDocument, Props> {
  handleIconClick = () => {
    const { onClickIcon, resource } = this.props
    onClickIcon(resource)
  }
  render() {
    const { selected, resource } = this.props
    return (
      <DocumentItem
        resource={resource}
        selected={selected}
        onClick={this.handleOnClick}
        onClickIcon={this.handleIconClick}
        onSelect={this.handleOnSelect} />
    )
  }
}
