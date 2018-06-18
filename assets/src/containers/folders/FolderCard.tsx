import {
  getFolder,
  showFolder
} from 'actions/folder-actions'
import LoadingCard from 'components/LoadingCard'
import FolderCardView from 'components/cards/FolderCardView'
import createApiResourceWrapper, { selectApiResource } from 'library/containers/ApiResourceHOC'
import { mapGetResource } from 'library/containers/common'

import {
  HasId
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
  selected: boolean,
  onResourceNotFound: (id: FolderId) => void,
  onClick: (resource: HasId) => void
  selectFolder: (resource: HasId) => void
}
interface Props extends OwnProps {
  resource: Folder,
  getResource: (id: FolderId) => void,
  showFolder: (id: FolderId) => void
}

class FolderCard extends React.Component<Props> {
  handleShowFolder = () => {
    const { resourceId, showFolder } = this.props
    showFolder(resourceId)
  }
  handleSelectFolder = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    const { resource, selectFolder } = this.props
    selectFolder(resource)
  }
  render() {
    const { resource, selected } = this.props
    return <FolderCardView
      folder={resource}
      selected={selected}
      selectFolder={this.handleSelectFolder}
      onClick={this.handleShowFolder} />
  }
}

const mapStateToProps = (state: RootState, ownProps: OwnProps) => {
  const { resourceId, selected } = ownProps
  return {
    ...selectApiResource<Folder>(state.model.folders, resourceId),
    selected
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    ...mapGetResource(dispatch, getFolder),
    showFolder: (id: FolderId) => dispatch(showFolder({ id }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  createApiResourceWrapper<Folder, Props>(isFolder)(FolderCard, LoadingCard))
