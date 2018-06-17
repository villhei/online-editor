import ListItemCurrentFolder from 'containers/folders/ListItemCurrentFolder'
import DocumentList from 'containers/lists/DocumentList'
import FolderList from 'containers/lists/FolderList'

import {
  HasId,
  Map
} from 'library/service/common'
import * as React from 'react'
import {
  TextDocument,
  TextDocumentId
} from 'service/document-service'
import {
  Folder,
  FolderId
} from 'service/folder-service'

type Props = {
  folder: Folder,
  selected: Map<HasId>,
  disabled: Map<HasId>,
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
      selectResource,
      selected,
      disabled,
      onResourceNotFound
    } = this.props
    return (
      <div className='ui divided item list'>
        <ListItemCurrentFolder
          resource={folder}
          disabled={!folder.parent}
          onClick={clickFolder}
        />
        <FolderList
          resourceIds={folder.children}
          selected={selected}
          disabled={disabled}
          clickFolder={clickFolder}
          onResourceNotFound={onResourceNotFound}
          selectResource={selectResource}
        />
        <DocumentList
          resourceIds={folder.documents}
          selected={selected}
          clickDocument={clickDocument}
          clickDocumentIcon={clickDocumentIcon}
          onResourceNotFound={onResourceNotFound}
          selectResource={selectResource}
        />
      </div>
    )
  }
}
