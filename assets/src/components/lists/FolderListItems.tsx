import ListItemCurrentFolder from 'containers/folders/ListItemCurrentFolder'
import ListItemFolder from 'containers/folders/ListItemFolder'
import * as React from 'react'
import {
  HasId,
  Map
} from 'service/common'
import {
  Folder,
  FolderId
} from 'service/folder-service'

type Props = {
  folder: Folder,
  selected: Map<HasId>,
  disabled: Map<HasId>,
  clickFolder: (resource: Folder) => void,
  onResourceNotFound?: (id: FolderId) => void,
  selectResource: (resource: Folder) => void
}

export default class FolderListItems extends React.Component<Props> {
  render() {
    const {
      clickFolder,
      folder,
      selectResource,
      selected,
      disabled,
      onResourceNotFound
    } = this.props
    return (
      <>
        <ListItemCurrentFolder
          resourceId={folder.id}
          disabled={!folder.parent}
          onClick={clickFolder}
        />
        {folder.children.map((folderId) => (
          <ListItemFolder
            key={folderId}
            onResourceNotFound={onResourceNotFound}
            selected={Boolean(selected[folderId])}
            disabled={Boolean(disabled[folderId])}
            resourceId={folderId}
            onClick={clickFolder}
            onSelect={selectResource} />
        ))}
      </>
    )
  }
}
