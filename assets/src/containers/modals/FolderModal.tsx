import FolderModalView from 'components/modals/FolderModal'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { HasId, Map } from 'service/common'
import { Folder, FolderId } from 'service/folder-service'

export type Props = {
  title: string,
  message: string,
  initialFolder: FolderId,
  selected: Folder | undefined,
  disabledItems: Map<HasId>,
  isValid: boolean,
  onConfirm: () => void,
  onSelect: (resource: Folder) => void,
  onCancel: () => void
}

class FolderModalContainer extends React.Component<Props> {
  render() {
    const modalContainer = (document.getElementById('modal') as HTMLDivElement)
    const viewProps = this.props
    return ReactDOM.createPortal(<FolderModalView
      {...viewProps} />
      , modalContainer)
  }
}

export default FolderModalContainer
