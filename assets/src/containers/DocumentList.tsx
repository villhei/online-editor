import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { RootState } from '../reducer'
import { createAndSelect } from 'actions/editor-actions'
import { ApiResource } from 'service/common'
import { getDocumentsByFolder, getDocument } from 'actions/document-actions'
import { getRootFolder, getChildren, getFolder } from 'actions/folder-actions'
import { Folder, FolderId, isFolder } from 'service/folder-service'
import DocumentList from 'components/DocumentList'
import { TextDocumentId } from 'service/document-service'

type DispatchProps = {
  createDocument: (id: FolderId) => any,
  getChildren: (id: FolderId) => any,
  getDocumentsByFolder: (folder: FolderId) => any,
  getFolderById: (id: FolderId) => any,
  getDocumentById: (id: TextDocumentId) => any
}

type StateProps = {
  documents: Array<TextDocumentId>,
  folder: ApiResource<Folder>,
  children: Array<FolderId>
}

type Props = DispatchProps & StateProps

class DocumentListContainer extends React.Component<Props, any> {
  createDocument = () => {
    const { folder } = this.props
    if (isFolder(folder)) {
      this.props.createDocument(folder.id)
    }
  }

  componentDidUpdate(prevProps: Props) {
    const { folder } = this.props
    if (isFolder(folder)) {
      if (prevProps.folder !== this.props.folder) {
        this.props.getDocumentsByFolder(folder.id)
        this.props.getChildren(folder.id)
      }
    }
  }

  render() {
    const { documents, children, getFolderById, getDocumentById } = this.props
    return <DocumentList
      getFolderById={getFolderById}
      getByDocumentId={getDocumentById}
      folders={children}
      documents={documents}
      createDocument={this.createDocument} />
  }
}

const mapStateToProps = ({ model }: RootState): StateProps => {
  const folder = model.navigator.byId[model.navigator.current]
  if (isFolder(folder)) {
    const { children, documents } = folder
    return {
      folder,
      documents,
      children
    }
  }
  return {
    folder,
    documents: [],
    children: []
  }
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>): DispatchProps => {
  return {
    createDocument: (id: FolderId) => dispatch(createAndSelect(id)),
    getChildren: (id: FolderId) => getChildren(dispatch, id),
    getDocumentsByFolder: (folder: string) => getDocumentsByFolder(dispatch, folder),
    getDocumentById: (id: TextDocumentId) => getDocument(dispatch, { id }),
    getFolderById: (id: FolderId) => getFolder(dispatch, id)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DocumentListContainer)
