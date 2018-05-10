import FolderModalView from 'components/modals/FolderModal'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { HasId, Map } from 'service/common'
import { Folder, FolderId } from 'service/folder-service'

export type Props = {
  title: string,
  message: string,
  items: Array<FolderId>,
  selected: Folder | undefined,
  selectedItems: Map<HasId>,
  isValid: boolean,
  initialFolder: FolderId,
  onConfirm: () => void,
  onCancel: () => void,
  onSelectionChange: (selected: Folder) => void
}

class FolderModal extends React.Component<Props> {
  handleConfirm = () => {
    this.props.onConfirm()
  }

  render() {
    const modalContainer = (document.getElementById('modal') as HTMLDivElement)
    const { title, message, items, onSelectionChange, onCancel, isValid, initialFolder, selectedItems } = this.props
    return ReactDOM.createPortal(<FolderModalView
      title={title}
      items={items}
      initialFolder={initialFolder}
      selectedItems={selectedItems}
      message={message}
      isValid={isValid}
      onSelect={onSelectionChange}
      onConfirm={this.handleConfirm}
      onCancel={onCancel} />
      , modalContainer)
  }
}

export default FolderModal
