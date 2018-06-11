import Modal from 'components/modals/Modal'
import ChildFolderList from 'containers/folders/ChildFolderList'
import { HasId, Map } from 'library/service/common'
import * as React from 'react'
import { Folder, FolderId } from 'service/folder-service'

export type Props = {
  title: string,
  message: string,
  folderId: FolderId,
  selected: FolderId | undefined,
  disabledItems: Map<HasId>
  isValid: boolean,
  onConfirm: () => void,
  onSelect: (resource: Folder) => void,
  onCancel: () => void
}

function FolderModalView(props: Props) {
  const { isValid, folderId, selected, disabledItems, onSelect } = props
  const selectedItems = selected ? { [selected]: { id: selected } } : {}
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
            resourceId={folderId}
            selectedItems={selectedItems}
            disabledItems={disabledItems}
            selectFolder={onSelect}
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
