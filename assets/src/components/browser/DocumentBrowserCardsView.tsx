import CurrentFolderCard from 'components/cards/CurrentFolderCard'
import DocumentCard from 'containers/documents/DocumentCard'
import FolderCard from 'containers/folders/FolderCard'
import * as React from 'react'
import {
  ApiResourceId,
  HasId,
  Map
} from 'service/common'
import {
  TextDocumentId
} from 'service/document-service'
import {
  Folder,
  FolderId
} from 'service/folder-service'

type Props = {
  documents: Array<ApiResourceId>,
  folders: Array<FolderId>,
  folder: Folder,
  selected: Map<HasId>,
  clickFolder: (resource: HasId) => void,
  clickDocument: (resource: HasId) => void,
  onResourceNotFound: (id: TextDocumentId) => void,
  selectResource: (resource: HasId) => void,
  getFolderById: (id: FolderId) => void
}

export default class DocumentCardsLayoutView extends React.Component<Props> {
  render() {
    const { documents,
      folder,
      folders,
      clickDocument,
      clickFolder,
      selectResource,
      selected,
      onResourceNotFound
    } = this.props
    return (
      <div className='ui twelve wide centered column'>
        <div className='ui four doubling cards'>
          <CurrentFolderCard folder={folder}
            disabled={!folder.parent}
            buttonAction={() => clickFolder(folder)} />
          {folders.map((folderId: FolderId) =>
            <FolderCard key={folderId}
              selectFolder={selectResource}
              onClick={clickFolder}
              onResourceNotFound={onResourceNotFound}
              selected={Boolean(selected[folderId])}
              resourceId={folderId} />)}
          {documents.map((documentId: TextDocumentId) =>
            <DocumentCard key={documentId}
              selectDocument={selectResource}
              onClick={clickDocument}
              onResourceNotFound={onResourceNotFound}
              selected={Boolean(selected[documentId])}
              resourceId={documentId} />)}
        </div>
      </div>)
  }
}
