import {
  getFolder
} from 'actions/folder-actions'
import Loading from 'components/Loading'
import FolderListItems from 'containers/folders/FolderListItems'
import createApiResourceWrapper, { mapGetResource, selectApiResource } from 'library/containers/ApiResourceHOC'
import {
  ApiResource,
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
  selectFolder: (resource: Folder) => void
}

type StateProps = {
  resource: ApiResource<Folder>,
  resourceId: FolderId
}
type Props = StateProps & OwnProps & {
  resource: Folder,
  getResource: (id: FolderId) => void
}

class ChildFolderList extends React.Component<Props> {
  render() {
    const { resourceId, selectedItems, disabledItems, selectFolder } = this.props
    const folder = resourceId
    return <div className='ui inverted divided selection list'>
      <FolderListItems
        resourceId={folder}
        selectedItems={selectedItems}
        disabledItems={disabledItems || {}}
        clickFolder={selectFolder}
      />
    </div>
  }
}

const mapStateToProps = (state: RootState, ownProps: OwnProps): StateProps => {
  const { resourceId } = ownProps
  return selectApiResource<Folder>(state.model.folders, resourceId)
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    ...mapGetResource(dispatch, getFolder)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  createApiResourceWrapper<Folder, Props>(isFolder)(ChildFolderList, Loading))