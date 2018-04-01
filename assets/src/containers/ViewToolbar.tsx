import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { RootState } from '../reducer'
import { push } from 'react-router-redux'
import { getDocument } from 'actions/document-actions'
import { ApiResource, ResourceStatus, getResourceName } from 'service/common'
import { TextDocument, TextDocumentId } from 'service/document-service'
import DocumentToolbarView from 'components/toolbars/DocumentView'

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
    return <DocumentToolbarView
      {...commonProps}
      title={getResourceName(document)}
    />
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
