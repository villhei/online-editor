import * as React from 'react'
import { Folder, FolderId } from 'service/folder-service'
import { TextDocument, TextDocumentId } from 'service/document-service'
import FolderCard from 'containers/FolderCard'
import DocumentCard from 'containers/DocumentCard'
import CurrentFolderCard from 'components/cards/CurrentFolderCard'
import ParentFolderCard from 'components/cards/ParentFolderCard'
import NewDocumentCard from 'components/cards/NewDocumentCard'

type Props = {
  documents: Array<TextDocumentId>,
  folders: Array<FolderId>,
  folder: Folder,
  getFolderById: (id: FolderId) => any,
  getByDocumentId: (id: TextDocumentId) => any
  createDocument: () => void,
  parentFolder: () => void
}

function sortDocuments(documents: Array<TextDocument>, descending = true): Array<TextDocument> {
  const sorted: Array<TextDocument> = documents.slice(0)
    .sort((a, b) => {
      return new Date(a.updated_at).valueOf() - new Date(b.updated_at).valueOf()
    })
  if (descending) {
    sorted.reverse()
    return sorted
  } else {
    return sorted
  }
}

export default class DocumentList extends React.Component<Props, any> {
  render() {
    const { documents, folder, folders, createDocument, parentFolder } = this.props
    return (
      <div className='ui twelve wide centered column'>
        <div className='ui four doubling cards'>
          <CurrentFolderCard folder={folder} />
          <ParentFolderCard
            disabled={!folder.parent}
            buttonAction={parentFolder}
          />
          <NewDocumentCard
            buttonAction={createDocument}
          />
          {folders.map((folderId: FolderId) =>
            <FolderCard key={folderId}
              resourceId={folderId} />)}
          {documents.map((documentId: TextDocumentId) =>
            <DocumentCard key={documentId}
              resourceId={documentId} />)}
        </div>
      </div>)
  }
}
