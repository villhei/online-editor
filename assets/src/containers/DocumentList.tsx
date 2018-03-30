import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { RootState } from '../reducer'
import { createAndSelect } from 'actions/editor-actions'
import { ApiResource } from 'service/common'
import { getDocumentsByFolder } from 'actions/document-actions'
import { getRootFolder, getChildren } from 'actions/folder-actions'
import { Folder, FolderId, isFolder } from 'service/folder-service'
import DocumentList from 'components/DocumentList'

type Props = {
  documents: RootState['model']['documents']['all'],
  folder: ApiResource<Folder>,
  createDocument: (id: FolderId) => any,
  getChildren: (id: FolderId) => any,
  getDocumentsByFolder: (folder: FolderId) => any
}

class DocumentListContainer extends React.Component<Props, any> {
  createDocument = () => {
    const { folder } = this.props
    if (isFolder(folder)) {
      this.props.createDocument(folder.id)
    }
  }

  componentDidUpdate(prevProps: Props) {
    const { folder } = this.props
    if (isFolder(folder)) {
      if (prevProps.folder !== this.props.folder) {
        this.props.getDocumentsByFolder(folder.id)
        this.props.getChildren(folder.id)
      }
    }
  }

  render() {
    const { documents } = this.props
    return <DocumentList
      documents={documents}
      createDocument={this.createDocument} />
  }
}

const mapStateToProps = ({ model }: RootState) => {
  return {
    documents: model.documents.all,
    folder: model.navigator.byId[model.navigator.current]
  }
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => {
  return {
    createDocument: (id: FolderId) => dispatch(createAndSelect(id)),
    getChildren: (id: FolderId) => getChildren(dispatch, id),
    getDocumentsByFolder: (folder: string) => getDocumentsByFolder(dispatch, folder)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DocumentListContainer)
