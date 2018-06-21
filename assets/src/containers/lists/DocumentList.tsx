import { getDocument } from 'actions/document-actions'
import LoadingComponent from 'components/Loading'
import ListItemDocument from 'containers/documents/ListItemDocument'
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
import { RootState } from 'main/store'
import * as React from 'react'
import { connect } from 'react-redux'
import { Ordering } from 'reducers/page'
import { Dispatch } from 'redux'
import {
  TextDocument,
  TextDocumentId,
  isDocument
} from 'service/document-service'

interface OwnProps {
  resourceIds: Array<TextDocumentId>,
  selected: Map<HasId>,
  ordering: Ordering,
  selectResource: (resource: TextDocument) => void,
  clickDocument: (resource: TextDocument) => void,
  clickDocumentIcon: (resource: TextDocument) => void
  onResourceNotFound: (id: TextDocumentId) => void
}

interface Props extends OwnProps {
  resources: Array<TextDocument>,
  getResource: (id: TextDocumentId) => void
}

class DocumentListView extends React.Component<Props> {
  render() {
    const { resources,
      clickDocument,
      selectResource,
      selected,
      ordering: { orderBy, reverse },
      clickDocumentIcon
    } = this.props

    const sorted = sortList<TextDocument>(resources, orderBy, reverse)

    const starred = sorted.filter(document => document.starred)
    const unstarred = sorted.filter(document => !document.starred)
    return (
      starred.concat(unstarred).map((document) => {
        const isSelected: boolean = Boolean(selected[document.id])

        return <ListItemDocument
          key={document.id}
          selected={isSelected}
          resource={document}
          disabled={false}
          onClick={clickDocument}
          onClickIcon={clickDocumentIcon}
          onSelect={(selectResource)} />
      })
    )
  }
}

const mapStateToProps = (state: RootState, ownProps: OwnProps): StateMappedProps<TextDocument> =>
  selectApiResources(state.model.documents, ownProps.resourceIds)

const mapDispatchToProps = (dispatch: Dispatch): DispatchMappedProps => ({
  ...mapGetResource(dispatch, getDocument)
})

const wrappedResource = createApiResourceListWrapper<TextDocument, Props>(isDocument)(DocumentListView, LoadingComponent)
export default connect(mapStateToProps, mapDispatchToProps)(wrappedResource)
