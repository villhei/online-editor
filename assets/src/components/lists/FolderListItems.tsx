import CurrentFolderItem from 'components/lists/CurrentFolderItem'
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
  folders: Array<FolderId>,
  folder: Folder,
  selected: Map<HasId>,
  disabled: Map<HasId>,
  clickFolder: (resource: Folder) => void,
  onResourceNotFound?: (id: FolderId) => void,
  selectResource: (resource: Folder) => void
}

export default class FolderListView extends React.Component<Props> {
  render() {
    const {
      clickFolder,
      folder,
      folders,
      selectResource,
      selected,
      disabled,
      onResourceNotFound
    } = this.props
    return (
      <>
        <CurrentFolderItem
          name={folder.name}
          disabled={Boolean(!folder.parent)}
          onClick={() => clickFolder(folder)}
        />
        {folders.map((folderId) => (
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
