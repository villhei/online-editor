import {
  getFolder
} from 'actions/folder-actions'
import Loading from 'components/Loading'
import FolderListItems from 'components/lists/FolderListItems'
import wrapApiResource, { mapGetResource, selectApiResource } from 'containers/ApiResourceHOC'
import * as React from 'react'
import { Dispatch, connect } from 'react-redux'
import {
  ApiResource,
  HasId,
  Map
} from 'service/common'
import {
  Folder,
  FolderId,
  isFolder
} from 'service/folder-service'

import { RootState } from 'main/reducer'

type OwnProps = {
  resourceId: FolderId,
  selectedItems: Map<HasId>,
  disabledItems?: Map<HasId>,
  onClick: (resource: Folder) => void
  selectFolder: (resource: Folder) => void
}

type StateProps = {
  resource: ApiResource<Folder>
}
type Props = StateProps & OwnProps & {
  resource: Folder,
  getResource: (id: FolderId) => void
}

class ChildFolderList extends React.Component<Props> {
  render() {
    const { resource, selectedItems, disabledItems, selectFolder, onClick } = this.props
    return <div className='ui inverted divided selection list'>
      <FolderListItems
        folder={resource}
        selected={selectedItems}
        disabled={disabledItems || {}}
        clickFolder={onClick}
        folders={resource.children}
        selectResource={selectFolder}
      />
    </div>
  }
}

const mapStateToProps = (state: RootState, ownProps: OwnProps): StateProps => {
  const { resourceId } = ownProps
  return selectApiResource<Folder>(state, 'folders', resourceId)
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => {
  return {
    ...mapGetResource(dispatch, getFolder)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  wrapApiResource<Folder, Props>(isFolder)(ChildFolderList, Loading))
