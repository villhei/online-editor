import FolderModalView from 'components/modals/FolderModal'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { HasId, Map } from 'service/common'
import { Folder, FolderId } from 'service/folder-service'

export type Props = {
  title: string,
  message: string,
  initialFolder: FolderId,
  selectedCount: number,
  selected: FolderId | undefined,
  disabledItems: Map<HasId>,
  isValid: boolean,
  onConfirm: () => void,
  onSelect: (id: FolderId) => void,
  onCancel: () => void
}

type State = {
  selectedFolder: FolderId
}

const modalContainer = (document.getElementById('modal') as HTMLDivElement)

function createOnSelectHandler(context: FolderModalContainer): (folder: Folder) => void {
  const { onSelect, selected, initialFolder } = context.props
  return (folder: Folder) => {
    if ((selected && folder.id === selected || folder.id === initialFolder)) {
      context.setState({
        selectedFolder: folder.parent
      })
      onSelect(folder.parent)
    } else {
      context.setState({
        selectedFolder: folder.id
      })
      onSelect(folder.id)
    }
  }
}

class FolderModalContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      selectedFolder: this.props.initialFolder
    }
  }

  render() {
    const viewProps = this.props
    const { selectedCount } = viewProps
    return ReactDOM.createPortal(
      <FolderModalView
        {...{
          ...viewProps,
          folderId: this.state.selectedFolder,
          onSelect: createOnSelectHandler(this),
          message: !Boolean(viewProps.selected) ? viewProps.message : `Click to confirm the move of ${selectedCount} items.`
        }} />
      , modalContainer)
  }
}

export default FolderModalContainer
