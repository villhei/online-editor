import { getFolder } from 'actions/folder-actions'
import LoadingComponent from 'components/Loading'
import CurrentFolderItem from 'components/lists/CurrentFolderItem'
import createApiResourceWrapper, { ApiResourceDispatch } from 'containers/ApiResourceHOC'
import ListItem, { ListItemProps, createDispatchMapper, createResourceMapper } from 'containers/lists/ListItem'
import * as React from 'react'
import { connect } from 'react-redux'
import { ApiResourceId } from 'service/common'
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

const mapStateToProps = createResourceMapper<Folder, OwnProps>('folders')
const mapDispatchToProps = createDispatchMapper(getFolder)

export default connect(mapStateToProps, mapDispatchToProps)(
  createApiResourceWrapper<Folder, Props>(isFolder)(ListItemCurrentFolder, LoadingComponent))
