import {
  getDocument
} from 'actions/document-actions'
import {
  getFolder,
  showFolder
} from 'actions/folder-actions'
import {
  Layout,
  selectLayout,
  setSelectedItems
} from 'actions/page-actions'
import LoadingComponent from 'components/Loading'
import DocumentCardsView from 'components/documents/DocumentCardsView'
import DocumentListView from 'components/documents/DocumentListView'
import wrapApiResource, { mapGetResource, selectApiResource } from 'containers/ApiResourceHOC'
import * as React from 'react'
import {
  Dispatch,
  connect
} from 'react-redux'
import { push } from 'react-router-redux'
import {
  ApiResourceId,
  HasId,
  Map
} from 'service/common'
import { TextDocument } from 'service/document-service'
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
  editResource: (id: ApiResourceId) => void,
  setLayout: (layout: Layout) => void,
  layout: Layout
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

function selectLayoutView(layout: string) {
  switch (layout) {
    case 'cards': {
      return DocumentCardsView
    }
    default: {
      return DocumentListView
    }
  }
}
class DocumentCardsLayoutContainer extends React.Component<Props, {}> {

  parentFolder = () => {
    const { resource, showFolder } = this.props
    showFolder(resource.parent)
  }

  handleClickFolder = (folder: Folder) => {
    const { showFolder } = this.props
    showFolder(folder.id)
  }

  handleClickDocument = (document: TextDocument) => {
    const { editResource } = this.props
    editResource(document.id)
  }

  handleSetLayout = (layout: Layout) => () => {
    this.props.setLayout(layout)
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
    const SelectedLayout = selectLayoutView(layout)
    return <>
      <div className='ui secondary two item menu'>
        <a onClick={this.handleSetLayout('list')} className='item'>Tree</a>
        <a onClick={this.handleSetLayout('cards')} className='item'>Cards</a>
      </div>
      <SelectedLayout
        getFolderById={getResource}
        selected={selected}
        selectResource={this.selectResource}
        clickFolder={this.handleClickFolder}
        clickDocument={this.handleClickDocument}
        onResourceNotFound={this.handleResourceNotFound}
        folder={resource}
        folders={sortedFolders}
        documents={sortedDocuments}
        parentFolder={this.parentFolder} />
    </>
  }
}

const mapStateToProps = (state: RootState, ownProps: RouterProvidedProps) => {
  const resourceId: FolderId = ownProps.match.params.folderId
  return {
    ...selectApiResource(state, 'folders', resourceId),
    selected: state.ui.page.selectedItems,
    layout: state.ui.page.layout
  }
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => {
  return {
    ...mapGetResource(dispatch, getFolder),
    showFolder: (id: FolderId) => dispatch(showFolder({ id })),
    setSelection: (selection: Map<HasId>) => dispatch(setSelectedItems({ selection })),
    editResource: (id: ApiResourceId) => dispatch(push('/edit/' + id)),
    setLayout: (layout: Layout) => dispatch(selectLayout(layout))
  }
}

const wrappedResource = wrapApiResource<Folder, Props>(isFolder)(DocumentCardsLayoutContainer, LoadingComponent)
export default connect(mapStateToProps, mapDispatchToProps)(wrappedResource)
