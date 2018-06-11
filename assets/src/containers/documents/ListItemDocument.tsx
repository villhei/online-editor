import { getDocument } from 'actions/document-actions'
import LoadingComponent from 'components/Loading'
import DocumentItem from 'components/lists/DocumentItem'
import ListItem, { ListItemProps, createDispatchMapper, createResourceMapper } from 'containers/lists/ListItem'
import createApiResourceWrapper, { ApiResourceDispatch } from 'library/containers/ApiResourceHOC'
import { ApiResourceId } from 'library/service/common'
import * as React from 'react'
import { connect } from 'react-redux'
import { TextDocument, isDocument } from 'service/document-service'

type DispatchProps = ApiResourceDispatch

type OwnProps = {
  resourceId: ApiResourceId
  selected: boolean,
  onSelect: (resource: TextDocument) => void,
  onClick: (resource: TextDocument) => void,
  onResourceNotFound: (id: ApiResourceId) => void
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

const mapStateToProps = createResourceMapper<TextDocument, OwnProps>((state => state.model.documents))
const mapDispatchToProps = createDispatchMapper(getDocument)

export default connect(mapStateToProps, mapDispatchToProps)(
  createApiResourceWrapper<TextDocument, Props>(isDocument)(ListItemDocument, LoadingComponent))
