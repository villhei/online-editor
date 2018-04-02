import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import wrapApiResouce from 'containers/ApiResourceHOC'
import { ApiResource } from 'service/common'
import { getFolder } from 'actions/folder-actions'
import { FolderId, Folder, isFolder } from 'service/folder-service'
import { RootState } from '../reducer'
import LoadingCard from 'components/LoadingCard'

type FolderCardProps = {
  resourceId: FolderId,
  resource: Folder,
  getResource: (id: FolderId) => any
}

class FolderCard extends React.Component<FolderCardProps> {
  render() {
    const folder = this.props.resource
    return (
      <div className='ui padded card' key={folder.id} >
        <div className='ui left aligned small header'><i className='folder icon' />{folder.name}</div>
        <div className='ui divider' />
      </div>
    )
  }
}

const mapStateToProps = ({ model, state, ui }: RootState, ownProps: { resourceId: FolderId }) => {
  const { resourceId } = ownProps
  const resource: ApiResource<Folder> = model.folders.byId[resourceId]
  return {
    resource,
    resourceId
  }
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => {
  return {
    getResource: (id: FolderId) => getFolder(dispatch, { id })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(wrapApiResouce(isFolder)(FolderCard, LoadingCard))
