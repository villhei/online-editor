import Modal from 'components/modals/Modal'
import ChildFolderList from 'containers/folders/ChildFolderList'
import * as React from 'react'
import { HasId, Map } from 'service/common'
import { Folder, FolderId } from 'service/folder-service'

export type Props = {
  title: string,
  message: string,
  folder: FolderId,
  selected: Folder | undefined,
  disabledItems: Map<HasId>
  isValid: boolean,
  onClickFolder: (folder: Folder) => void,
  onConfirm: () => void,
  onSelect: (resource: Folder) => void,
  onCancel: () => void
}

function FolderModalView(props: Props) {
  const { isValid, folder, selected, disabledItems, onSelect, onClickFolder } = props
  const selectedItems = selected ? { [selected.id]: selected } : {}
  return (
    <Modal>
      <>
        <div className='ui icon header'>
          <i className='icon folder' />
          {props.title}
        </div>
        <div className='content'>
          <p>{props.message}</p>
          <ChildFolderList
            resourceId={folder}
            selectedItems={selectedItems}
            disabledItems={disabledItems}
            selectFolder={onSelect}
            onClick={onClickFolder}
          />
        </div>
        <div className='actions'>
          <button
            className='ui red basic cancel inverted button'
            onClick={props.onCancel}>
            <i className='remove icon' />
            Cancel
          </button>
          <button
            className='ui green ok inverted button'
            disabled={!isValid}
            onClick={props.onConfirm}>
            <i className='checkmark icon' />
            Ok
          </button>
        </div>
      </>
    </Modal>
  )
}

export default FolderModalView
