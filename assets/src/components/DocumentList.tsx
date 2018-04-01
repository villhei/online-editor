import * as React from 'react'
import { RootState } from '../reducer'
import { ApiResource } from 'service/common'
import { Folder, FolderId, isFolder } from 'service/folder-service'
import { TextDocument, TextDocumentId } from 'service/document-service'
import FolderCard from 'containers/FolderCard'
import DocumentCard from 'containers/DocumentCard'

type Props = {
  documents: Array<TextDocumentId>,
  getFolderById: (id: FolderId) => any,
  getByDocumentId: (id: TextDocumentId) => any
  folders: Array<FolderId>,
  createDocument: () => void
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
    const { documents, folders, createDocument } = this.props
    return (
      <div className='ui twelve wide centered column'>
        <div className='ui four doubling cards'>
          <a className='ui padded card' onClick={createDocument} >
            <div className='ui left aligned small header'><i className='plus icon' />Add new</div>
          </a>
          {folders.map((folderId: FolderId) => <FolderCard key={folderId} resourceId={folderId} />)}
          {documents.map((documentId: TextDocumentId) => <DocumentCard key={documentId} resourceId={documentId} />)}
        </div>
      </div>)
  }
}
