import {
  getDocument,
  updateDocument
} from 'actions/document-actions'
import {
  getFolder,
  showFolder
} from 'actions/folder-actions'
import {
  Layout,
  selectLayout,
  setListOrdering,
  setSelectedItems
} from 'actions/page-actions'
import LoadingComponent from 'components/Loading'
import DocumentBrowserCardsView from 'components/browser/DocumentBrowserCardsView'
import DocumentBrowserListView from 'components/browser/DocumentBrowserListView'
import LayoutSelection from 'components/browser/LayoutSelection'
import createApiResourceWrapper, { selectApiResource } from 'library/containers/ApiResourceHOC'
import { mapGetResource } from 'library/containers/common'
import {
  ApiResourceId,
  HasId,
  Map
} from 'library/service/common'
import * as React from 'react'
import {
  Dispatch,
  connect
} from 'react-redux'
import { push } from 'react-router-redux'
import { Ordering } from 'reducers/page'
import { SortableKeys } from 'service/common'
import { PartialTextDocument, TextDocument, TextDocumentId } from 'service/document-service'
import {
  Folder,
  FolderId,
  isFolder
} from 'service/folder-service'

import { RootState, RouterProvidedProps } from 'main/store'

interface Props {
  getResource: (id: FolderId) => typeof getDocument,
  showFolder: (id: FolderId) => typeof showFolder,
  setSelection: (selection: Map<HasId>) => typeof setSelectedItems,
  setOrder: (order: SortableKeys, reverse: boolean) => void,
  editResource: (id: ApiResourceId) => void,
  updateDocument: (id: TextDocumentId, updated: PartialTextDocument) => void,
  setLayout: (layout: Layout) => void,
  layout: Layout
  resourceId: FolderId,
  resource: Folder,
  selected: Map<HasId>,
  ordering: Ordering
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
      return DocumentBrowserCardsView
    }
    default: {
      return DocumentBrowserListView
    }
  }
}
class DocumentCardsLayoutContainer extends React.Component<Props, {}> {
  handleClickFolder = (folder: Folder) => {
    const { resource, showFolder } = this.props
    if (folder === resource) {
      showFolder(folder.parent)
    } else {
      showFolder(folder.id)
    }
  }

  handleOrderChange = (order: SortableKeys) => {
    const { setOrder, ordering: { orderBy, reverse } } = this.props
    setOrder(order, orderBy === order ? !reverse : false)
  }

  handleClickDocument = (document: TextDocument) => {
    const { editResource } = this.props
    editResource(document.id)
  }

  handleClickDocumentIcon = (document: TextDocument) => {
    const { updateDocument } = this.props
    updateDocument(document.id, { starred: !document.starred, updated_at: document.updated_at })
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
      layout,
      ordering
    } = this.props
    const {
      documents,
      children
    } = resource

    const sortedDocuments = sortResource(documents)
    const sortedFolders = sortResource(children)
    const SelectedLayout = selectLayoutView(layout)
    return <>
      <LayoutSelection
        onSelectList={this.handleSetLayout('list')}
        onSelectTree={this.handleSetLayout('cards')}
        selected={layout}
      />
      <SelectedLayout
        getFolderById={getResource}
        selected={selected}
        selectResource={this.selectResource}
        onChangeOrder={this.handleOrderChange}
        ordering={ordering}
        disabled={{}}
        clickFolder={this.handleClickFolder}
        clickDocument={this.handleClickDocument}
        clickDocumentIcon={this.handleClickDocumentIcon}
        onResourceNotFound={this.handleResourceNotFound}
        folder={resource}
        folders={sortedFolders}
        documents={sortedDocuments} />
    </>
  }
}

const mapStateToProps = (state: RootState, ownProps: RouterProvidedProps) => {
  const resourceId: FolderId = ownProps.match.params.folderId
  return {
    ...selectApiResource(state.model.folders, resourceId),
    selected: state.ui.page.selectedItems,
    layout: state.ui.page.layout,
    ordering: state.ui.page.order
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    ...mapGetResource(dispatch, getFolder),
    showFolder: (id: FolderId) => dispatch(showFolder({ id })),
    setSelection: (selection: Map<HasId>) => dispatch(setSelectedItems({ selection })),
    setOrder: (orderBy: SortableKeys, reverse: boolean) => dispatch(setListOrdering({ orderBy, reverse })),
    editResource: (id: ApiResourceId) => dispatch(push('/edit/' + id)),
    updateDocument: (id: TextDocumentId, resource: PartialTextDocument) => updateDocument(dispatch, { id, resource }),
    setLayout: (layout: Layout) => dispatch(selectLayout(layout))
  }
}

const wrappedResource = createApiResourceWrapper<Folder, Props>(isFolder)(DocumentCardsLayoutContainer, LoadingComponent)
export default connect(mapStateToProps, mapDispatchToProps)(wrappedResource)
