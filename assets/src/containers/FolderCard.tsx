import {
  getFolder,
  showFolder
} from 'actions/folder-actions'
import LoadingCard from 'components/LoadingCard'
import FolderCardView from 'components/cards/FolderCardView'
import wrapApiResource from 'containers/ApiResourceHOC'
import * as React from 'react'
import { Dispatch, connect } from 'react-redux'
import {
  ApiResource,
  HasId
} from 'service/common'
import {
  Folder,
  FolderId,
  isFolder
} from 'service/folder-service'

import { RootState } from '../reducer'

type OwnProps = {
  resourceId: FolderId,
  selected: boolean,
  onResourceNotFound: (id: FolderId) => any,
  selectFolder: (resource: HasId) => any
}
type Props = OwnProps & {
  resource: Folder,
  getResource: (id: FolderId) => any,
  showFolder: (id: FolderId) => any
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

const mapStateToProps = ({ model }: RootState, ownProps: OwnProps) => {
  const { resourceId, selected } = ownProps
  const resource: ApiResource<Folder> = model.folders.byId[resourceId]
  return {
    selected,
    resource,
    resourceId
  }
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => {
  return {
    getResource: (id: FolderId) => getFolder(dispatch, { id }),
    showFolder: (id: FolderId) => dispatch(showFolder({ id }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  wrapApiResource<Folder, Props>(isFolder)(FolderCard, LoadingCard))
