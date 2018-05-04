import {
  getDocument
} from 'actions/document-actions'
import {
  getFolder,
  showFolder
} from 'actions/folder-actions'
import {
  setSelectedItems
} from 'actions/page-actions'
import LoadingComponent from 'components/Loading'
import DocumentCardsView from 'components/documents/DocumentCardsView'
import DocumentListView from 'components/documents/DocumentListView'
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
import {
  Folder,
  FolderId,
  isFolder
} from 'service/folder-service'

import { RootState, RouterProvidedProps } from 'main/reducer'

type Props = {
  getResource: (id: FolderId) => typeof getDocument,
  showFolder: (id: FolderId) => typeof showFolder,
  setSelection: (selection: Map<HasId>) => typeof setSelectedItems,
  layout: 'cards' | 'list'
  resourceId: FolderId,
  resource: Folder,
  selected: Map<HasId>
}

function sortResource(documents: Array<ApiResourceId>): Array<ApiResourceId> {
  const sorted: Array<ApiResourceId> = documents.slice(0)
    .sort((a, b) => {
      return a.localeCompare(b)
    })
  return sorted
}

class DocumentCardsLayoutContainer extends React.Component<Props, {}> {

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

  handleResourceNotFound = () => {
    const { getResource, resourceId } = this.props
    getResource(resourceId)
  }

  render() {
    const {
      resource,
      selected,
      getResource,
      layout
    } = this.props
    const {
      documents,
      children
    } = resource

    const sortedDocuments = sortResource(documents)
    const sortedFolders = sortResource(children)
    switch (layout) {
      case 'cards': {
        return <DocumentCardsView
          getFolderById={getResource}
          selected={selected}
          selectResource={this.selectResource}
          onResourceNotFound={this.handleResourceNotFound}
          folder={resource}
          folders={sortedFolders}
          documents={sortedDocuments}
          parentFolder={this.parentFolder} />
      }
      default: {
        return <DocumentListView
          getFolderById={getResource}
          selected={selected}
          selectResource={this.selectResource}
          onResourceNotFound={this.handleResourceNotFound}
          folder={resource}
          folders={sortedFolders}
          documents={sortedDocuments}
          parentFolder={this.parentFolder} />
      }
    }
  }
}

const mapStateToProps = ({ model, ui }: RootState, ownProps: RouterProvidedProps) => {
  const resourceId: FolderId = ownProps.match.params.folderId
  const resource = model.folders.byId[resourceId]
  return {
    resourceId,
    resource,
    selected: ui.page.selectedItems,
    layout: 'list'
  }
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => {
  return {
    getResource: (id: FolderId) => getFolder(dispatch, { id }),
    showFolder: (id: FolderId) => dispatch(showFolder({ id })),
    setSelection: (selection: Map<HasId>) => dispatch(setSelectedItems({ selection }))
  }
}

const wrappedResource = wrapApiResource<Folder, Props>(isFolder)(DocumentCardsLayoutContainer, LoadingComponent)
export default connect(mapStateToProps, mapDispatchToProps)(wrappedResource)
