import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect, Dispatch } from 'react-redux'
import { TextDocument } from 'service/document-service'
import { getDocuments } from 'actions/document-actions'
import { toggleMenu, ToggleMenu } from 'actions/page-actions'
import { RootState } from '../reducer'
import Main from 'components/Main'

type Props = {
  documents: RootState['model']['documents']['all'],
  navigationOpen: boolean,
  getDocuments: () => any,
  toggleNavigation: () => any
}

class MainContainer extends React.Component<Props, any> {
  componentDidMount() {
    this.props.getDocuments()
  }

  toggleNavigation = () => {
    this.props.toggleNavigation()
  }

  render() {
    const { documents, navigationOpen } = this.props
    return <Main
      documents={documents}
      toggleNavigation={this.toggleNavigation}
      navigationOpen={navigationOpen} />
  }
}



const mapStateToProps = ({ model, ui }: RootState) => {
  return {
    documents: model.documents.all,
    navigationOpen: ui.page.navigationOpen
  }
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => {
  return {
    getDocuments: () => getDocuments(dispatch, undefined),
    toggleNavigation: (menu: string) => dispatch(toggleMenu({ menu: 'navigation' }))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)