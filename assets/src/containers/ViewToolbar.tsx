import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { RootState } from '../reducer'
import { resetDocumentChanges, deleteAndRefresh, updateAndRefresh, updateDocumentName } from 'actions/editor-actions'
import { getDocument } from 'actions/document-actions'
import { ApiResource, ResourceStatus } from 'service/common'
import { TextDocument, PartialTextDocument, TextDocumentId, isDocument } from 'service/document-service'
import ViewToolbarView from 'components/toolbars/View'

export type Props = {
  getDocument: (id: TextDocumentId) => Promise<TextDocument>,
  documentId: string,
  document: ApiResource<TextDocument>
}

class ViewToolbar extends React.Component<Props, any> {
  componentDidMount() {
    const { documentId, getDocument } = this.props
    getDocument(documentId)
  }

  render() {
    const { documentId, document, } = this.props
    if (document === ResourceStatus.Loading) {
      return <ViewToolbarView
        title={'Loading...'}
      />
    } else if (document === ResourceStatus.NotFound) {
      return <ViewToolbarView
        title={'Not found'}
      />
    } else if (document && document.name) {
      return <ViewToolbarView
        title={document.name}
      />
    } else {
      return <ViewToolbarView
        title={'Error'}
      />
    }
  }
}

const mapStateToProps = ({ model, state, ui }: RootState, ownProps: any) => {
  const documentId: TextDocumentId = ownProps.match.params.documentId
  const document: ApiResource<TextDocument> | undefined = model.documents.byId[documentId]
  return {
    document,
    documentId
  }
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => {
  return {
    getDocument: (id: TextDocumentId) => getDocument(dispatch, { id })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewToolbar)