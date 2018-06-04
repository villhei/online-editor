import { getDocument } from 'actions/document-actions'
import LoadingComponent from 'components/Loading'
import DocumentItem from 'components/lists/DocumentItem'
import createApiResourceWrapper, { ApiResourceDispatch } from 'containers/ApiResourceHOC'
import ListItem, { ListItemProps, createDispatchMapper, createResourceMapper } from 'containers/lists/ListItem'
import * as React from 'react'
import { connect } from 'react-redux'
import { ApiResourceId } from 'service/common'
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

const mapStateToProps = createResourceMapper<TextDocument, OwnProps>('documents')
const mapDispatchToProps = createDispatchMapper(getDocument)

export default connect(mapStateToProps, mapDispatchToProps)(
  createApiResourceWrapper<TextDocument, Props>(isDocument)(ListItemDocument, LoadingComponent))
