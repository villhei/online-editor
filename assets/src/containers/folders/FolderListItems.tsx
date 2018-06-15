import {
  getFolder
} from 'actions/folder-actions'
import LoadingCard from 'components/LoadingCard'
import FolderListItems from 'components/lists/FolderListItems'
import createApiResourceWrapper, { selectApiResource } from 'library/containers/ApiResourceHOC'
import { ApiResourceDispatch, mapGetResource } from 'library/containers/common'

import {
  HasId,
  Map
} from 'library/service/common'
import * as React from 'react'
import { Dispatch, connect } from 'react-redux'
import {
  Folder,
  FolderId,
  isFolder
} from 'service/folder-service'

import { RootState } from 'main/store'

type OwnProps = {
  resourceId: FolderId,
  selectedItems: Map<HasId>,
  disabledItems?: Map<HasId>,
  onResourceNotFound?: (id: FolderId) => void,
  selectFolder?: (id: Folder) => void
  clickFolder: (resource: Folder) => void
}
type Props = OwnProps & {
  resource: Folder,
  getResource: (id: FolderId) => void
}

class FolderListItemsContainer extends React.Component<Props> {
  render() {
    const { resource, selectedItems, disabledItems, clickFolder, selectFolder } = this.props
    return <FolderListItems
      folder={resource}
      selected={selectedItems}
      disabled={disabledItems || {}}
      clickFolder={clickFolder}
      selectResource={selectFolder} />
  }
}

const mapStateToProps = (state: RootState, ownProps: OwnProps) => {
  const { resourceId } = ownProps
  return selectApiResource<Folder>(state.model.folders, resourceId)
}

const mapDispatchToProps = (dispatch: Dispatch): ApiResourceDispatch => {
  return mapGetResource(dispatch, getFolder)
}

export default connect(mapStateToProps, mapDispatchToProps)(
  createApiResourceWrapper<Folder, Props>(isFolder)(FolderListItemsContainer, LoadingCard))
