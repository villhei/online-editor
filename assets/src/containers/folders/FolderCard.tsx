import {
  getFolder,
  showFolder
} from 'actions/folder-actions'
import LoadingCard from 'components/LoadingCard'
import FolderCardView from 'components/cards/FolderCardView'
import wrapApiResource, { mapGetResource, selectApiResource } from 'containers/ApiResourceHOC'
import * as React from 'react'
import { Dispatch, connect } from 'react-redux'
import {
  HasId
} from 'service/common'
import {
  Folder,
  FolderId,
  isFolder
} from 'service/folder-service'

import { RootState } from 'main/reducer'

type OwnProps = {
  resourceId: FolderId,
  selected: boolean,
  onResourceNotFound: (id: FolderId) => void,
  selectFolder: (resource: HasId) => void
}
type Props = OwnProps & {
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
      showFolder={this.handleShowFolder} />
  }
}

const mapStateToProps = (state: RootState, ownProps: OwnProps) => {
  const { resourceId, selected } = ownProps
  return {
    ...selectApiResource<Folder>(state, 'folders', resourceId),
    selected
  }
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => {
  return {
    ...mapGetResource(dispatch, getFolder),
    showFolder: (id: FolderId) => dispatch(showFolder({ id }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  wrapApiResource<Folder, Props>(isFolder)(FolderCard, LoadingCard))
