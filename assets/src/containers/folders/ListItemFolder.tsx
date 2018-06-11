import { getFolder } from 'actions/folder-actions'
import LoadingComponent from 'components/Loading'
import FolderItem from 'components/lists/FolderItem'
import ListItem, { ListItemProps, createDispatchMapper, createResourceMapper } from 'containers/lists/ListItem'
import createApiResourceWrapper, { ApiResourceDispatch } from 'library/containers/ApiResourceHOC'
import { ApiResourceId } from 'library/service/common'
import * as React from 'react'
import { connect } from 'react-redux'
import { Folder, isFolder } from 'service/folder-service'

type OwnProps = {
  resourceId: ApiResourceId
  selected: boolean,
  disabled: boolean,
  onClick: (resource: Folder) => void,
  onSelect?: (resource: Folder) => void,
  onResourceNotFound?: (id: ApiResourceId) => void
}

type Props = ListItemProps<Folder> & OwnProps & ApiResourceDispatch & {
  resource: Folder
}

class ListItemFolder extends ListItem<Folder, Props> {
  render() {
    const { selected, disabled, resource, resourceId, onSelect } = this.props
    return (
      <FolderItem
        resource={resource}
        resourceId={resourceId}
        selected={selected}
        disabled={disabled}
        onClick={this.handleOnClick}
        onSelect={onSelect ? this.handleOnSelect : undefined} />
    )
  }
}

const mapStateToProps = createResourceMapper<Folder, OwnProps>(state => state.model.folders)
const mapDispatchToProps = createDispatchMapper(getFolder)

export default connect(mapStateToProps, mapDispatchToProps)(
  createApiResourceWrapper<Folder, Props>(isFolder)(ListItemFolder, LoadingComponent))
