import ListItemDocument from 'containers/documents/ListItemDocument'
import ListItemFolder from 'containers/folders/ListItemFolder'
import * as React from 'react'
import {
  ApiResourceId,
  HasId,
  Map
} from 'service/common'
import {
  TextDocument,
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
  clickFolder: (resource: Folder) => void,
  clickDocument: (resource: TextDocument) => void,
  onResourceNotFound: (id: TextDocumentId) => void,
  selectResource: (resource: HasId) => void,
  getFolderById: (id: FolderId) => void,
  parentFolder: () => void
}

export default class DocumentCardsLayoutView extends React.Component<Props> {
  render() {
    const { documents,
      clickFolder,
      clickDocument,
      folder,
      folders,
      selectResource,
      selected,
      onResourceNotFound,
      parentFolder
    } = this.props
    return (
      <div className='ui twelve wide centered column'>
        <div className='ui middle aligned divided list'>
          <div className='item'>
            <div className='ui content grid'>
              <div className='ui row'>
                <div className='ui twelve wide column'>
                  <i className='large icons' onClick={parentFolder}>
                    <i className='circular inverted grey folder icon'></i>
                    <i className='circular inverted top left corner ellipsis horizontal  icon'></i>
                  </i>
                  <a>
                    {folder.name}
                  </a>
                </div>
              </div>
            </div>
          </div >
          {folders.map((folderId) => (
            <ListItemFolder
              key={folderId}
              onResourceNotFound={onResourceNotFound}
              selected={Boolean(selected[folderId])}
              resourceId={folderId}
              onClick={clickFolder}
              onSelect={selectResource} />
          ))}
          {documents.map((documentId) => (
            <ListItemDocument
              key={documentId}
              onResourceNotFound={onResourceNotFound}
              selected={Boolean(selected[documentId])}
              resourceId={documentId}
              onClick={clickDocument}
              onSelect={selectResource} />
          ))}
        </div>
      </div>
    )
  }
}
