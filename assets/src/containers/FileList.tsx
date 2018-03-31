import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { RootState } from '../reducer'
import { createAndSelect } from 'actions/editor-actions'
import FileList from 'components/FileList'

type Props = {
  documents: RootState['model']['documents']['all'],
  createDocument: () => any
}

class FileListContainer extends React.Component<Props, any> {
  createDocument = () => {
    this.props.createDocument()
  }
  render () {
    const { documents } = this.props
    return <FileList
      documents={documents}
      createDocument={this.createDocument} />
  }
}

const mapStateToProps = ({ model }: RootState) => {
  return {
    documents: model.documents.all
  }
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => {
  return {
    createDocument: () => dispatch(createAndSelect())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(FileListContainer)
