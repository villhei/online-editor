import { getFolder } from 'actions/folder-actions'
import LoadingComponent from 'components/Loading'
import wrapApiResource, { ApiResourceDispatch, mapGetResource, selectApiResource } from 'containers/ApiResourceHOC'
import { RootState } from 'main/reducer'
import * as React from 'react'
import { Dispatch, connect } from 'react-redux'
import { ApiResource, ApiResourceId } from 'service/common'
import { Folder, FolderId, isFolder } from 'service/folder-service'

export type OwnProps = {
  resourceId: FolderId
  selected: boolean
}

type StateProps = {
  resourceId: ApiResourceId,
  resource: ApiResource<Folder>
  selected: boolean
}

type DispatchProps = ApiResourceDispatch

type Props = OwnProps & StateProps & DispatchProps

class ListItemFolder extends React.Component<Props> {
  render() {
    const { resourceId } = this.props
    return (
      < div key={resourceId} className='item' >
        <div className='ui content grid'>
          <div className='ui row'>
            <div className='ui twelve wide column'>
              <i className='circular inverted large blue folder icon'></i>
              <a>{resourceId}</a>
            </div>
            <div className='ui two wide column'>
              <div className='ui basic blue icon button'>
                <i className='check icon' />
              </div>
            </div>
          </div>
        </div>
      </div >)
  }
}

const mapStateToProps = (state: RootState, ownProps: OwnProps): StateProps => {
  const { resourceId, selected } = ownProps
  return {
    ...selectApiResource<Folder>(state, 'folders', resourceId),
    selected
  }
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>): DispatchProps => mapGetResource(dispatch, getFolder)

export default connect(mapStateToProps, mapDispatchToProps)(
  wrapApiResource<Folder, Props>(isFolder)(ListItemFolder, LoadingComponent))
