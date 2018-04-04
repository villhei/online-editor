import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { RootState } from '../reducer'
import { ApiResource, getResourceName, ResourceStatus } from 'service/common'
import { getFolder, createFolder } from 'actions/folder-actions'
import { createFolderAndRefresh, createAndSelect } from 'actions/editor-actions'
import { Folder, FolderId } from 'service/folder-service'
import MainToolbarView from 'components/toolbars/MainToolbarView'

type StateProps = {
  folderId: FolderId,
  folder: ApiResource<Folder>
}

type DispatchProps = {
  getFolder: (id: FolderId) => any,
  createFolder: (name: string, parent: FolderId) => any,
  createDocument: (name: string, folder: FolderId) => any
}

type Props = StateProps & DispatchProps
class MainToolbar extends React.PureComponent<Props, {}> {
  refresh = () => {
    const { folderId, getFolder } = this.props
    getFolder(folderId)
  }

  handleCreateFolder = () => {
    const { folderId, createFolder } = this.props
    createFolder('New folder', folderId)
  }

  handleCreateDocument = () => {
    const { folderId, createDocument } = this.props
    createDocument('new document', folderId)
  }

  render() {
    const { folder } = this.props
    const refreshing = folder === ResourceStatus.Loading
    return <MainToolbarView
      disabled={!folder}
      refreshing={refreshing}
      title={getResourceName(folder)}
      refreshFolder={this.refresh}
      createFolder={this.handleCreateFolder}
      createDocument={this.handleCreateDocument}
    />
  }
}

const mapStateToProps = ({ model, state, ui }: RootState, ownProps: any): StateProps => {
  const folderId: FolderId = model.folders.current
  const folder: ApiResource<Folder> | undefined = model.folders.byId[folderId]
  return {
    folder,
    folderId
  }
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>): DispatchProps => {
  return {
    getFolder: (id: FolderId) => getFolder(dispatch, { id }),
    createFolder: (name: string, parent: FolderId) => dispatch(createFolderAndRefresh({ folder: { name, parent } })),
    createDocument: (name: string, folder: FolderId) => dispatch(createAndSelect({ folder }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainToolbar)
