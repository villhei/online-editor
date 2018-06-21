import {
  getFolder
} from 'actions/folder-actions'
import Loading from 'components/Loading'
import ListItemCurrentFolder from 'containers/folders/ListItemCurrentFolder'
import FolderList from 'containers/lists/FolderList'
import createApiResourceWrapper, { selectApiResource } from 'library/containers/ApiResourceHOC'
import { ApiResourceDispatch, mapGetResource } from 'library/containers/common'
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

interface OwnProps {
  resourceId: FolderId,
  selectedItems: Map<HasId>,
  disabledItems?: Map<HasId>,
  selectFolder: (resource: Folder) => void
}

interface StateProps {
  resource: ApiResource<Folder>,
  resourceId: FolderId
}
type Props = StateProps & OwnProps & {
  resource: Folder,
  getResource: (id: FolderId) => void
}

class ChildFolderList extends React.Component<Props> {
  render() {
    const { resource, selectedItems, disabledItems, selectFolder } = this.props
    return <div className='ui inverted divided selection list'>
      <ListItemCurrentFolder
        resource={resource}
        disabled={!resource.parent}
        onClick={selectFolder}
      />
      <FolderList
        resourceIds={resource.children}
        selected={selectedItems}
        disabled={disabledItems}
        ordering={{
          orderBy: 'name',
          reverse: false
        }}
        clickFolder={selectFolder}
        onResourceNotFound={() => null}
      />
    </div>
  }
}

const mapStateToProps = (state: RootState, ownProps: OwnProps): StateProps => {
  const { resourceId } = ownProps
  return selectApiResource<Folder>(state.model.folders, resourceId)
}

const mapDispatchToProps = (dispatch: Dispatch): ApiResourceDispatch => mapGetResource(dispatch, getFolder)

export default connect(mapStateToProps, mapDispatchToProps)(
  createApiResourceWrapper<Folder, Props>(isFolder)(ChildFolderList, Loading))
