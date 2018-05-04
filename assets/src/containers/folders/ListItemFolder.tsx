import { getFolder } from 'actions/folder-actions'
import LoadingComponent from 'components/Loading'
import FolderItem from 'components/lists/FolderItem'
import wrapApiResource, { ApiResourceDispatch, mapGetResource, selectApiResource } from 'containers/ApiResourceHOC'
import { RootState } from 'main/reducer'
import * as React from 'react'
import { Dispatch, connect } from 'react-redux'
import { ApiResource, ApiResourceId } from 'service/common'
import { Folder, FolderId, isFolder } from 'service/folder-service'

export type OwnProps = {
  resourceId: FolderId
  selected: boolean
}

type StateProps = {
  resourceId: ApiResourceId,
  resource: ApiResource<Folder>,
  selected: boolean
}

type DispatchProps = ApiResourceDispatch

type Props = OwnProps & StateProps & DispatchProps & {
  resource: Folder
}

class ListItemFolder extends React.Component<Props> {
  render() {
    const { selected, resource, resourceId } = this.props
    return (
      <FolderItem resource={resource}
        resourceId={resourceId}
        selected={selected} />
    )
  }
}

const mapStateToProps = (state: RootState, ownProps: OwnProps): StateProps => {
  const { resourceId, selected } = ownProps
  return {
    ...selectApiResource<Folder>(state, 'folders', resourceId),
    selected
  }
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>): DispatchProps => mapGetResource(dispatch, getFolder)

export default connect(mapStateToProps, mapDispatchToProps)(
  wrapApiResource<Folder, Props>(isFolder)(ListItemFolder, LoadingComponent))
