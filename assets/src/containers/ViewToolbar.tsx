import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { RootState } from '../reducer'
import { push } from 'react-router-redux'
import { resetDocumentChanges, deleteAndRefresh, updateAndRefresh, updateDocumentName } from 'actions/editor-actions'
import { getDocument } from 'actions/document-actions'
import { ApiResource, ResourceStatus } from 'service/common'
import { TextDocument, PartialTextDocument, TextDocumentId, isDocument } from 'service/document-service'
import ViewToolbarView from 'components/toolbars/View'

export type Props = {
  getDocument: (id: TextDocumentId) => Promise<TextDocument>,
  navigate: (route: string) => any,
  documentId: string,
  document: ApiResource<TextDocument>,
  refreshing: boolean
}

class ViewToolbar extends React.Component<Props, any> {
  componentDidMount() {
    this.refreshDocument()
  }

  editDocument = () => {
    this.props.navigate('/edit/' + this.props.documentId)
  }

  refreshDocument = () => {
    const { documentId, getDocument } = this.props
    getDocument(documentId)
  }

  render() {
    const { documentId, document, refreshing } = this.props
    const commonProps = {
      editDisabled: document === ResourceStatus.NotFound,
      editDocument: this.editDocument,
      refreshing,
      refreshDocument: this.refreshDocument
    }
    if (document === ResourceStatus.Loading) {
      return <ViewToolbarView
        {...commonProps}
        title={'Loading...'}
      />
    } else if (document === ResourceStatus.NotFound) {
      return <ViewToolbarView
        {...commonProps}
        title={'Not found'}
      />
    } else if (document && document.name) {
      return <ViewToolbarView
        {...commonProps}
        title={document.name}
      />
    } else {
      return <ViewToolbarView
        {...commonProps}
        title={'Error'}
      />
    }
  }
}

const mapStateToProps = ({ model, state, ui }: RootState, ownProps: any) => {
  const documentId: TextDocumentId = ownProps.match.params.documentId
  const document: ApiResource<TextDocument> | undefined = model.documents.byId[documentId]
  const { refreshing } = ui.page.editorToolbar
  return {
    document,
    documentId,
    refreshing
  }
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => {
  return {
    getDocument: (id: TextDocumentId) => getDocument(dispatch, { id }),
    navigate: (route: string) => dispatch(push(route))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewToolbar)