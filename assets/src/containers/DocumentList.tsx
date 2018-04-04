import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { RootState } from '../reducer'
import { createAndSelect, createFolderAndRefresh } from 'actions/editor-actions'
import { getDocumentsByFolder, getDocument } from 'actions/document-actions'
import { getChildren, getFolder, createFolder, selectFolder } from 'actions/folder-actions'
import { Folder, FolderId, isFolder, PartialFolder } from 'service/folder-service'
import DocumentList from 'components/DocumentList'
import LoadingComponent from 'components/Loading'
import wrapApiResource from 'containers/ApiResourceHOC'
import { TextDocumentId } from 'service/document-service'

type Props = {
  getChildren: (id: FolderId) => any,
  getDocumentsByFolder: (folder: FolderId) => any,
  getDocumentById: (id: TextDocumentId) => any,
  getResource: (id: FolderId) => any,
  selectFolder: (id: FolderId) => any,
  resourceId: FolderId,
  resource: Folder
}

class DocumentListContainer extends React.Component<Props, any> {
  parentFolder = () => {
    const { resource, selectFolder } = this.props
    selectFolder(resource.parent)
  }
  render() {
    const { resource, getResource, getDocumentById } = this.props
    const { documents, children } = resource
    return <DocumentList
      getFolderById={getResource}
      getByDocumentId={getDocumentById}
      folder={resource}
      folders={children}
      documents={documents}
      parentFolder={this.parentFolder} />
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
    getChildren: (id: FolderId) => getChildren(dispatch, { id }),
    getDocumentsByFolder: (folder: string) => getDocumentsByFolder(dispatch, folder),
    getDocumentById: (id: TextDocumentId) => getDocument(dispatch, { id }),
    getResource: (id: FolderId) => getFolder(dispatch, { id }),
    selectFolder: (id: FolderId) => dispatch(selectFolder({ id }))
  }
}

const wrappedResource = wrapApiResource<Folder, Props>(isFolder)(DocumentListContainer, LoadingComponent)
export default connect(mapStateToProps, mapDispatchToProps)(wrappedResource)
