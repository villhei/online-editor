import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect, Dispatch } from 'react-redux'
import { TextDocument } from 'service/document-service'
import { getDocuments } from 'actions/document-actions'
import { toggleMenu, ToggleMenu } from 'actions/page-actions'
import { RootState } from '../reducer'
import FileDropdown from 'components/toolbars/FileDropdown'

type Props = {
  documents: Array<TextDocument>,
  navigationOpen: boolean,
  toggleNavigation: () => any
}

class FileDropdownContainer extends React.Component<Props, any> {

  toggleNavigation = () => {
    this.props.toggleNavigation()
  }

  render() {
    const { documents, navigationOpen } = this.props
    return <FileDropdown documents={documents}
      showNavigation={navigationOpen}
      toggleNavigation={this.toggleNavigation} />
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
    toggleNavigation: (menu: string) => dispatch(toggleMenu({ menu: 'navigation' }))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(FileDropdownContainer)