import {
  getFolder
} from 'actions/folder-actions'
import Loading from 'components/Loading'
import wrapApiResource, { mapGetResource, selectApiResource } from 'containers/ApiResourceHOC'
import FolderListItems from 'containers/folders/FolderListItems'
import * as React from 'react'
import { Dispatch, connect } from 'react-redux'
import {
  ApiResource,
  HasId,
  Map
} from 'service/common'
import {
  Folder,
  FolderId,
  isFolder
} from 'service/folder-service'

import { RootState } from 'main/reducer'

type OwnProps = {
  resourceId: FolderId,
  selectedItems: Map<HasId>,
  disabledItems?: Map<HasId>,
  selectFolder: (resource: Folder) => void
}

type StateProps = {
  resource: ApiResource<Folder>
}
type Props = StateProps & OwnProps & {
  resource: Folder,
  getResource: (id: FolderId) => void
}

type State = {
  folder?: FolderId
}

class ChildFolderList extends React.Component<Props, State> {
  state: State = {}

  handleClickFolder = (folder: Folder) => {
    const { resourceId } = this.props
    if (folder.id === (this.state.folder || resourceId)) {
      this.setState({
        folder: folder.parent
      })
    } else {
      this.setState({
        folder: folder.id
      })
    }
  }

  componentDidMount() {
    this.setState({
      folder: this.props.resourceId
    })
  }
  render() {
    const { resourceId, selectedItems, disabledItems, selectFolder } = this.props
    const folder = this.state.folder || resourceId
    return <div className='ui inverted divided selection list'>
      <FolderListItems
        resourceId={folder}
        selectedItems={selectedItems}
        disabledItems={disabledItems || {}}
        clickFolder={this.handleClickFolder}
        selectFolder={selectFolder}
      />
    </div>
  }
}

const mapStateToProps = (state: RootState, ownProps: OwnProps): StateProps => {
  const { resourceId } = ownProps
  return selectApiResource<Folder>(state, 'folders', resourceId)
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => {
  return {
    ...mapGetResource(dispatch, getFolder)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  wrapApiResource<Folder, Props>(isFolder)(ChildFolderList, Loading))
