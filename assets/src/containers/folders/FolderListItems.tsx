import {
  getFolder
} from 'actions/folder-actions'
import LoadingCard from 'components/LoadingCard'
import FolderListItems from 'components/lists/FolderListItems'
import wrapApiResource, { mapGetResource, selectApiResource } from 'containers/ApiResourceHOC'
import * as React from 'react'
import { Dispatch, connect } from 'react-redux'
import {
  HasId,
  Map
} from 'service/common'
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
  return selectApiResource<Folder>(state, 'folders', resourceId)
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return mapGetResource(dispatch, getFolder)
}

export default connect(mapStateToProps, mapDispatchToProps)(
  wrapApiResource<Folder, Props>(isFolder)(FolderListItemsContainer, LoadingCard))
