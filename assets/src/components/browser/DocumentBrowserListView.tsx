import ItemListHeading from 'components/lists/ItemListHeading'
import ListItemCurrentFolder from 'containers/folders/ListItemCurrentFolder'
import DocumentList from 'containers/lists/DocumentList'
import FolderList from 'containers/lists/FolderList'
import {
  HasId,
  Map
} from 'library/service/common'
import * as React from 'react'
import { Ordering } from 'reducers/page'
import { SortableKeys } from 'service/common'
import {
  TextDocument,
  TextDocumentId
} from 'service/document-service'
import {
  Folder,
  FolderId
} from 'service/folder-service'

interface Props {
  folder: Folder,
  selected: Map<HasId>,
  disabled: Map<HasId>,
  ordering: Ordering,
  onChangeOrder: (order: SortableKeys) => void,
  clickFolder: (resource: Folder) => void,
  clickDocument: (resource: TextDocument) => void,
  clickDocumentIcon: (resource: TextDocument) => void,
  onResourceNotFound: (id: TextDocumentId) => void,
  selectResource: (resource: HasId) => void,
  getFolderById: (id: FolderId) => void
}

export default class DocumentBrowserListView extends React.Component<Props> {
  render() {
    const {
      clickFolder,
      clickDocument,
      clickDocumentIcon,
      folder,
      ordering,
      onChangeOrder,
      selectResource,
      selected,
      disabled,
      onResourceNotFound
    } = this.props
    return (
      <div className='ui divided selection list'>
        <ListItemCurrentFolder
          resource={folder}
          disabled={!folder.parent}
          onClick={clickFolder}
        />
        <ItemListHeading
          onClickColumn={onChangeOrder}
        />
        <FolderList
          resourceIds={folder.children}
          selected={selected}
          disabled={disabled}
          ordering={ordering}
          clickFolder={clickFolder}
          onResourceNotFound={onResourceNotFound}
          selectResource={selectResource}
        />
        <DocumentList
          resourceIds={folder.documents}
          selected={selected}
          ordering={ordering}
          clickDocument={clickDocument}
          clickDocumentIcon={clickDocumentIcon}
          onResourceNotFound={onResourceNotFound}
          selectResource={selectResource}
        />
      </div>
    )
  }
}
