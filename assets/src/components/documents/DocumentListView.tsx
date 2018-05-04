import ListItemFolder from 'containers/folders/ListItemFolder'
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
  onResourceNotFound: (id: TextDocumentId) => void,
  selectResource: (resource: HasId) => void,
  getFolderById: (id: FolderId) => void,
  parentFolder: () => void
}

export default class DocumentCardsLayoutView extends React.Component<Props> {
  render() {
    const { documents,
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
          <div className='blue bordered item'>
            <i className='large grey folder icon'></i>
            <div className='content'>
              foo
            </div>
          </div>
          {folders.map((id) => (<ListItemFolder key={id} selected={false} resourceId={id} />))}
          {documents.map((id) => (
            <div key={id} className='item'>
              <i className='circular inverted large teal file icon'></i>
              <div className='content'>
                <a>{id}</a>
              </div>
            </div>))
          }
        </div>
      </div >
    )
  }
}
