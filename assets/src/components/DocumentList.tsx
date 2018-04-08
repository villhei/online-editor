import CurrentFolderCard from 'components/cards/CurrentFolderCard'
import DocumentCard from 'containers/DocumentCard'
import FolderCard from 'containers/FolderCard'
import * as React from 'react'
import { ApiResourceId } from 'service/common'
import { TextDocument, TextDocumentId } from 'service/document-service'
import { Folder, FolderId } from 'service/folder-service'

type Props = {
  documents: Array<ApiResourceId>,
  folders: Array<FolderId>,
  folder: Folder,
  selected: Set<ApiResourceId>,
  selectResource: (id: ApiResourceId) => any,
  getFolderById: (id: FolderId) => any,
  getByDocumentId: (id: ApiResourceId) => any
  parentFolder: () => void
}

export default class DocumentList extends React.Component<Props, any> {
  render() {
    const { documents,
      folder,
      folders,
      selectResource,
      selected,
      parentFolder
    } = this.props
    return (
      <div className='ui twelve wide centered column'>
        <div className='ui four doubling cards'>
          <CurrentFolderCard folder={folder}
            disabled={!folder.parent}
            buttonAction={parentFolder} />
          {folders.map((folderId: FolderId) =>
            <FolderCard key={folderId}
              selectFolder={selectResource}
              selected={selected.has(folderId)}
              resourceId={folderId} />)}
          {documents.map((documentId: TextDocumentId) =>
            <DocumentCard key={documentId}
              selectDocument={selectResource}
              selected={selected.has(documentId)}
              resourceId={documentId} />)}
        </div>
      </div>)
  }
}
