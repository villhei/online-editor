import * as React from 'react'
import Navigation from 'components/toolbars/Navigation'
import { TextDocument } from 'service/document-service'

class MainToolbar extends React.PureComponent<{}, {}> {
  render() {
    return <Navigation />
  }
}

export default MainToolbar
