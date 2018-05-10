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
  clickFolder: (resource: Folder) => void,
  onResourceNotFound?: (id: FolderId) => void,
  selectResource: (resource: Folder) => void,
  parentFolder: () => void
}

export default class DocumentCardsLayoutView extends React.Component<Props> {
  render() {
    const {
      clickFolder,
      folder,
      folders,
      selectResource,
      selected,
      onResourceNotFound,
      parentFolder
    } = this.props
    return (
      <>
        <CurrentFolderItem
          name={folder.name}
          disabled={Boolean(!folder.parent)}
          onClick={parentFolder}
        />
        {folders.map((folderId) => (
          <ListItemFolder
            key={folderId}
            onResourceNotFound={onResourceNotFound}
            selected={Boolean(selected[folderId])}
            resourceId={folderId}
            onClick={clickFolder}
            onSelect={selectResource} />
        ))}
      </>
    )
  }
}
