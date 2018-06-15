import FolderItem from 'components/lists/FolderItem'
import ListItem, { ListItemProps } from 'containers/lists/ListItem'
import * as React from 'react'
import { Folder } from 'service/folder-service'

type OwnProps = {
  resource: Folder,
  selected: boolean,
  disabled: boolean,
  onClick: (resource: Folder) => void,
  onSelect?: (resource: Folder) => void
}

type Props = ListItemProps<Folder> & OwnProps & {
  resource: Folder
}

export default class ListItemFolder extends ListItem<Folder, Props> {
  render() {
    const { selected, disabled, resource, onSelect } = this.props
    return (
      <FolderItem
        resource={resource}
        selected={selected}
        disabled={disabled}
        onClick={this.handleOnClick}
        onSelect={onSelect ? this.handleOnSelect : undefined} />
    )
  }
}
