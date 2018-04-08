import {
  getDocument,
  getDocumentsByFolder
} from 'actions/document-actions'
import {
  createAndSelect,
  createFolderAndRefresh
} from 'actions/editor-actions'
import {
  createFolder,
  getChildren,
  getFolder,
  showFolder
} from 'actions/folder-actions'
import DocumentList from 'components/DocumentList'
import LoadingComponent from 'components/Loading'
import wrapApiResource from 'containers/ApiResourceHOC'
import * as React from 'react'
import {
  DragSource,
  DropTarget
} from 'react-dnd'
import {
  Dispatch,
  connect
} from 'react-redux'

import { ApiResourceId } from 'service/common'
import { TextDocumentId } from 'service/document-service'
import {
  Folder,
  FolderId,
  PartialFolder,
  isFolder
} from 'service/folder-service'

import { RootState } from '../reducer'

type Props = {
  getChildren: (id: FolderId) => any,
  getDocumentsByFolder: (folder: FolderId) => any,
  getDocumentById: (id: TextDocumentId) => any,
  getResource: (id: FolderId) => any,
  showFolder: (id: FolderId) => any,
  resourceId: FolderId,
  resource: Folder
}

type State = {
  selected: Set<ApiResourceId>
}

function sortResource(documents: Array<ApiResourceId>, descending = true): Array<ApiResourceId> {
  const sorted: Array<ApiResourceId> = documents.slice(0)
    .sort((a, b) => {
      return a.localeCompare(b)
    })
  return sorted
}

class DocumentListContainer extends React.Component<Props, any> {
  state = {
    selected: new Set()
  }

  parentFolder = () => {
    const { resource, showFolder } = this.props
    showFolder(resource.parent)
  }

  selectResource = (id: ApiResourceId) => {
    const { selected } = this.state
    if (selected.has(id)) {
      selected.delete(id)
    } else {
      selected.add(id)
    }
    this.setState({
      selected: new Set(selected)
    })
  }
  render() {
    const {
      resource,
      getResource,
      getDocumentById
    } = this.props
    const {
      documents,
      children
    } = resource
    const {
      selected
    } = this.state

    const sortedDocuments = sortResource(documents)
    const sortedFolders = sortResource(children)

    return <DocumentList
      getFolderById={getResource}
      selected={selected}
      getByDocumentId={getDocumentById}
      selectResource={this.selectResource}
      folder={resource}
      folders={sortedFolders}
      documents={sortedDocuments}
      parentFolder={this.parentFolder} />
  }
}

const mapStateToProps = ({ model }: RootState, ownProps: any) => {
  const resourceId: FolderId = ownProps.match.params.folderId
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
    showFolder: (id: FolderId) => dispatch(showFolder({ id }))
  }
}

const wrappedResource = wrapApiResource<Folder, Props>(isFolder)(DocumentListContainer, LoadingComponent)
export default connect(mapStateToProps, mapDispatchToProps)(wrappedResource)
