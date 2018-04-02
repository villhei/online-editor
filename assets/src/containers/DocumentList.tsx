import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { RootState } from '../reducer'
import { createAndSelect, createAndReload } from 'actions/editor-actions'
import { getDocumentsByFolder, getDocument } from 'actions/document-actions'
import { getChildren, getFolder, createFolder } from 'actions/folder-actions'
import { Folder, FolderId, isFolder, PartialFolder } from 'service/folder-service'
import DocumentList from 'components/DocumentList'
import wrapApiResource from 'containers/ApiResourceHOC'
import { TextDocumentId } from 'service/document-service'

type Props = {
  createDocument: (folder: FolderId) => any,
  createFolder: (folder: PartialFolder) => any,
  getChildren: (id: FolderId) => any,
  getDocumentsByFolder: (folder: FolderId) => any,
  getDocumentById: (id: TextDocumentId) => any,
  getResource: (id: FolderId) => any,
  resourceId: FolderId,
  resource: Folder
}

class DocumentListContainer extends React.Component<Props, any> {
  createDocument = () => {
    this.props.createDocument(this.props.resourceId)
  }
  createFolder = () => {
    this.props.createFolder({
      name: 'New folder',
      parent: this.props.resourceId
    })
  }
  render() {
    const { resource, getResource, getDocumentById } = this.props
    const { documents, children } = resource
    return <DocumentList
      getFolderById={getResource}
      getByDocumentId={getDocumentById}
      folders={children}
      documents={documents}
      createDocument={this.createDocument}
      createFolder={this.createFolder} />
  }
}

const mapStateToProps = ({ model }: RootState) => {
  const resourceId = model.folders.current
  const resource = model.folders.byId[resourceId]
  return {
    resourceId,
    resource
  }
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => {
  return {
    createDocument: (folder: FolderId) => dispatch(createAndSelect({ folder })),
    createFolder: (folder: PartialFolder) => dispatch(createAndReload({ folder })),
    getChildren: (id: FolderId) => getChildren(dispatch, { id }),
    getDocumentsByFolder: (folder: string) => getDocumentsByFolder(dispatch, folder),
    getDocumentById: (id: TextDocumentId) => getDocument(dispatch, { id }),
    getResource: (id: FolderId) => getFolder(dispatch, { id })
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(wrapApiResource<Folder, Props>(isFolder)(DocumentListContainer))
