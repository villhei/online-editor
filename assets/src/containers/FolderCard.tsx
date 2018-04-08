import {
  getFolder,
  selectFolder
} from 'actions/folder-actions'
import LoadingCard from 'components/LoadingCard'
import FolderCardView from 'components/cards/FolderCardView'
import wrapApiResource from 'containers/ApiResourceHOC'
import * as React from 'react'
import { Dispatch, connect } from 'react-redux'
import { ApiResource } from 'service/common'
import {
  Folder,
  FolderId,
  isFolder
} from 'service/folder-service'

import { RootState } from '../reducer'

type Props = {
  resourceId: FolderId,
  resource: Folder,
  getResource: (id: FolderId) => any,
  selectFolder: (id: FolderId) => any
}

class FolderCard extends React.Component<Props> {
  handleSelectFolder = () => {
    const { resourceId, selectFolder } = this.props
    selectFolder(resourceId)
  }
  render() {
    const folder = this.props.resource
    return <FolderCardView
      folder={folder}
      selectFolder={this.handleSelectFolder} />
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
    getResource: (id: FolderId) => getFolder(dispatch, { id }),
    selectFolder: (id: FolderId) => dispatch(selectFolder({ id }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  wrapApiResource<Folder, Props>(isFolder)(FolderCard, LoadingCard))
