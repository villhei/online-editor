import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect, Dispatch } from 'react-redux'
import { TextDocument } from 'service/document-service'
import { getDocuments } from 'actions/document-actions'
import { toggleMenu, ToggleMenu } from 'actions/page-actions'
import { RootState } from '../reducer'
import Main from 'components/Main'

type Props = {
  documents: Array<TextDocument>,
  getDocuments: () => any
}

class MainContainer extends React.Component<Props, any> {
  componentDidMount() {
    this.props.getDocuments()
  }

  render() {
    const { documents } = this.props
    return <Main documents={documents} />
  }
}

const mapStateToProps = ({ model, ui }: RootState) => {
  return {
    documents: model.documents.all
  }
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => {
  return {
    getDocuments: () => getDocuments(dispatch, undefined)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)