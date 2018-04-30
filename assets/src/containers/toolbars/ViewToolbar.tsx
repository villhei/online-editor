import { getDocument } from 'actions/document-actions'
import DocumentToolbarView from 'components/toolbars/DocumentView'
import * as React from 'react'
import {
  Dispatch,
  connect
} from 'react-redux'
import { push } from 'react-router-redux'
import {
  ApiResource,
  ResourceStatus,
  getResourceName
} from 'service/common'
import {
  TextDocument,
  TextDocumentId
} from 'service/document-service'

import { RootState, RouterProvidedProps } from 'main/reducer'

export type StateProps = {
  documentId: string,
  document: ApiResource<TextDocument>,
  refreshing: boolean
}

type DispatchProps = {
  getDocument: (id: TextDocumentId) => void,
  navigate: (route: string) => void
}

export type Props = StateProps & DispatchProps

class ViewToolbar extends React.Component<Props> {
  editDocument = () => {
    this.props.navigate('/edit/' + this.props.documentId)
  }

  refreshDocument = () => {
    const { documentId, getDocument } = this.props
    getDocument(documentId)
  }

  render() {
    const { document, refreshing } = this.props
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

const mapStateToProps = ({ model, ui }: RootState, ownProps: RouterProvidedProps): StateProps => {
  const documentId: TextDocumentId = ownProps.match.params.documentId
  const document: ApiResource<TextDocument> | undefined = model.documents.byId[documentId]
  const { refreshing } = ui.page.editorToolbar
  return {
    document,
    documentId,
    refreshing
  }
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>): DispatchProps => {
  return {
    getDocument: (id: TextDocumentId) => getDocument(dispatch, { id }),
    navigate: (route: string) => dispatch(push(route))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewToolbar)
