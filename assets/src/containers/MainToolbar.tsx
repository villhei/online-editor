import * as React from 'react'
import Navigation from 'components/toolbars/Navigation'
import { TextDocument } from 'service/document-service'

export type Props = {
  documents: TextDocument[]
  showNavigation: boolean,
  toggleNavigation: () => void
}

class MainToolbar extends React.Component<Props, any> {
  render() {
    const { documents, showNavigation, toggleNavigation } = this.props
    return <Navigation
      documents={documents}
      showNavigation={showNavigation}
      toggleNavigation={toggleNavigation}
    />
  }
}

export default MainToolbar
