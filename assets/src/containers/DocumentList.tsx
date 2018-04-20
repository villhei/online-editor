import {
  getDocument,
  getDocumentsByFolder
} from 'actions/document-actions'
import {
  getChildren,
  getFolder,
  showFolder
} from 'actions/folder-actions'
import {
  setSelectedItems
} from 'actions/page-actions'
import DocumentList from 'components/DocumentList'
import LoadingComponent from 'components/Loading'
import wrapApiResource from 'containers/ApiResourceHOC'
import * as React from 'react'
import {
  Dispatch,
  connect
} from 'react-redux'

import {
  ApiResourceId,
  HasId,
  Map
} from 'service/common'
import { TextDocumentId } from 'service/document-service'
import {
  Folder,
  FolderId,
  isFolder
} from 'service/folder-service'

import { RootState } from '../reducer'

type Props = {
  getChildren: (id: FolderId) => any,
  getDocumentsByFolder: (folder: FolderId) => any,
  getDocumentById: (id: TextDocumentId) => any,
  getResource: (id: FolderId) => any,
  showFolder: (id: FolderId) => any,
  setSelection: (selection: Map<HasId>) => any,
  resourceId: FolderId,
  resource: Folder,
  selected: Map<HasId>
}

function sortResource(documents: Array<ApiResourceId>, descending = true): Array<ApiResourceId> {
  const sorted: Array<ApiResourceId> = documents.slice(0)
    .sort((a, b) => {
      return a.localeCompare(b)
    })
  return sorted
}

class DocumentListContainer extends React.Component<Props, {}> {

  parentFolder = () => {
    const { resource, showFolder } = this.props
    showFolder(resource.parent)
  }

  selectResource = (resource: HasId) => {
    const { selected, setSelection } = this.props
    if (selected[resource.id]) {
      const {
        [resource.id]: omit,
        ...newSelection
      } = selected
      setSelection(newSelection)
    } else {
      setSelection({
        ...selected,
        [resource.id]: resource
      })
    }
  }

  handleResourceNotFound = (resource: ApiResourceId) => {
    const { getResource, resourceId } = this.props
    getResource(resourceId)
  }

  render() {
    const {
      resource,
      selected,
      getResource,
      getDocumentById
    } = this.props
    const {
      documents,
      children
    } = resource

    const sortedDocuments = sortResource(documents)
    const sortedFolders = sortResource(children)

    return <DocumentList
      getFolderById={getResource}
      selected={selected}
      getByDocumentId={getDocumentById}
      selectResource={this.selectResource}
      onResourceNotFound={this.handleResourceNotFound}
      folder={resource}
      folders={sortedFolders}
      documents={sortedDocuments}
      parentFolder={this.parentFolder} />
  }
}

const mapStateToProps = ({ model, ui }: RootState, ownProps: any) => {
  const resourceId: FolderId = ownProps.match.params.folderId
  const resource = model.folders.byId[resourceId]
  return {
    resourceId,
    resource,
    selected: ui.page.selectedItems
  }
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => {
  return {
    getChildren: (id: FolderId) => getChildren(dispatch, { id }),
    getDocumentsByFolder: (folder: string) => getDocumentsByFolder(dispatch, folder),
    getDocumentById: (id: TextDocumentId) => getDocument(dispatch, { id }),
    getResource: (id: FolderId) => getFolder(dispatch, { id }),
    showFolder: (id: FolderId) => dispatch(showFolder({ id })),
    setSelection: (selection: Map<HasId>) => dispatch(setSelectedItems({ selection }))
  }
}

const wrappedResource = wrapApiResource<Folder, Props>(isFolder)(DocumentListContainer, LoadingComponent)
export default connect(mapStateToProps, mapDispatchToProps)(wrappedResource)
