import * as React from 'react'
import { FolderId } from 'service/folder-service'
import { TextDocument, TextDocumentId } from 'service/document-service'
import FolderCard from 'containers/FolderCard'
import DocumentCard from 'containers/DocumentCard'
import NewFolderCard from 'components/cards/NewFolderCard'
import NewDocumentCard from 'components/cards/NewDocumentCard'

type Props = {
  documents: Array<TextDocumentId>,
  getFolderById: (id: FolderId) => any,
  getByDocumentId: (id: TextDocumentId) => any
  folders: Array<FolderId>,
  createDocument: () => void,
  createFolder: () => void
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
    const { documents, folders, createDocument, createFolder } = this.props
    return (
      <div className='ui twelve wide centered column'>
        <div className='ui four doubling cards'>
          <NewFolderCard
            buttonAction={createFolder}
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
