import { getDocument } from 'actions/document-actions'
import LoadingComponent from 'components/Loading'
import DocumentItem from 'components/lists/DocumentItem'
import wrapApiResource, { ApiResourceDispatch, mapGetResource, selectApiResource } from 'containers/ApiResourceHOC'
import ListItem, { ListItemProps } from 'containers/lists/ListItem'
import { RootState } from 'main/reducer'
import * as React from 'react'
import { Dispatch, connect } from 'react-redux'
import { ApiResource, ApiResourceId } from 'service/common'
import { TextDocument, isDocument } from 'service/document-service'

type DispatchProps = ApiResourceDispatch

type OwnProps = {
  resourceId: ApiResourceId
  selected: boolean,
  onSelect: (resource: TextDocument) => void,
  onClick: (resource: TextDocument) => void,
  onResourceNotFound: (id: ApiResourceId) => void
}

type MappedProps = {
  resourceId: ApiResourceId,
  resource: ApiResource<TextDocument>
  selected: boolean
}

type Props = ListItemProps<TextDocument> & OwnProps & DispatchProps & {
  resource: TextDocument
}

class ListItemDocument extends ListItem<TextDocument, Props> {
  render() {
    const { selected, resource, resourceId } = this.props
    return (
      <DocumentItem
        resource={resource}
        resourceId={resourceId}
        selected={selected}
        onClick={this.handleOnClick}
        onSelect={this.handleOnSelect} />
    )
  }
}

const mapStateToProps = (state: RootState, ownProps: OwnProps): MappedProps => {
  const { resourceId, selected } = ownProps
  return {
    ...selectApiResource<TextDocument>(state, 'documents', resourceId),
    selected
  }
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>): DispatchProps => mapGetResource(dispatch, getDocument)

export default connect(mapStateToProps, mapDispatchToProps)(
  wrapApiResource<TextDocument, Props>(isDocument)(ListItemDocument, LoadingComponent))
