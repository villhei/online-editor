import CurrentFolderItem from 'components/lists/CurrentFolderItem'
import ListItem from 'containers/lists/ListItem'
import { ApiResourceId } from 'library/service/common'
import * as React from 'react'
import { Folder } from 'service/folder-service'

interface Props {
  resource: Folder
  disabled: boolean,
  onClick: (resource: Folder) => void,
  onResourceNotFound?: (id: ApiResourceId) => void
}

export default class ListItemCurrentFolder extends ListItem<Folder, Props> {
  render() {
    const { disabled, resource } = this.props
    return (
      <CurrentFolderItem
        name={resource.name}
        disabled={disabled}
        onClick={this.handleOnClick} />
    )
  }
}
