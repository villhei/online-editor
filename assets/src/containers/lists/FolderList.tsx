import {
  getFolder
} from 'actions/folder-actions'
import LoadingComponent from 'components/Loading'
import ListItemFolder from 'containers/folders/ListItemFolder'
import {
  DispatchMappedProps,
  StateMappedProps,
  mapGetResource,
  selectApiResources,
  sortList
} from 'containers/lists/List'
import createApiResourceListWrapper from 'library/containers/ApiResourceListHOC'
import {
  HasId,
  Map
} from 'library/service/common'
import * as React from 'react'
import { Dispatch, connect } from 'react-redux'
import { Ordering } from 'reducers/page'
import {
  Folder,
  FolderId,
  isFolder
} from 'service/folder-service'

import { RootState } from 'main/store'

interface OwnProps {
  resourceIds: Array<FolderId>,
  selected: Map<HasId>,
  disabled?: Map<HasId>,
  ordering: Ordering,
  selectResource?: (id: Folder) => void,
  clickFolder: (resource: Folder) => void
  onResourceNotFound: (id: FolderId) => void
}

interface Props extends OwnProps {
  resources: Array<Folder>,
  getResource: (id: FolderId) => void
}

class FolderListItemsContainer extends React.Component<Props> {
  render() {
    const { disabled,
      selected,
      ordering: { orderBy, reverse },
      clickFolder,
      selectResource,
      resources } = this.props
    return sortList<Folder>(resources, orderBy, reverse).map((folder) => {
      const isDisabled = disabled ? Boolean(disabled[folder.id]) : false
      const isSelected: boolean = Boolean(selected[folder.id])

      return <ListItemFolder
        key={folder.id}
        resource={folder}
        selected={isSelected}
        disabled={isDisabled}
        onClick={clickFolder}
        onSelect={selectResource} />
    })
  }
}

const mapStateToProps = (state: RootState, ownProps: OwnProps): StateMappedProps<Folder> =>
  selectApiResources(state.model.folders, ownProps.resourceIds)

const mapDispatchToProps = (dispatch: Dispatch): DispatchMappedProps =>
  mapGetResource(dispatch, getFolder)

const wrappedResource = createApiResourceListWrapper<Folder, Props>(isFolder)(FolderListItemsContainer, LoadingComponent)
export default connect(mapStateToProps, mapDispatchToProps)(wrappedResource)
