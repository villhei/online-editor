import { getFolder } from 'actions/folder-actions'
import LoadingComponent from 'components/Loading'
import CurrentFolderItem from 'components/lists/CurrentFolderItem'
import ListItem, { ListItemProps, createDispatchMapper, createResourceMapper } from 'containers/lists/ListItem'
import createApiResourceWrapper from 'library/containers/ApiResourceHOC'
import { ApiResourceDispatch } from 'library/containers/common'
import { ApiResourceId } from 'library/service/common'
import * as React from 'react'
import { connect } from 'react-redux'
import { Folder, isFolder } from 'service/folder-service'

type OwnProps = {
  resourceId: ApiResourceId
  disabled: boolean,
  onClick: (resource: Folder) => void,
  onResourceNotFound?: (id: ApiResourceId) => void
}

type Props = ListItemProps<Folder> & OwnProps & ApiResourceDispatch & {
  resource: Folder
}

class ListItemCurrentFolder extends ListItem<Folder, Props> {
  render() {
    const { disabled, resource } = this.props
    return (
      <CurrentFolderItem
        name={resource.name}
        disabled={disabled}
        onClick={this.handleOnClick} />
    )
  }
}

const mapStateToProps = createResourceMapper<Folder, OwnProps>(state => state.model.folders)
const mapDispatchToProps = createDispatchMapper(getFolder)

export default connect(mapStateToProps, mapDispatchToProps)(
  createApiResourceWrapper<Folder, Props>(isFolder)(ListItemCurrentFolder, LoadingComponent))
