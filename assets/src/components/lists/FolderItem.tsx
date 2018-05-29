import * as classNames from 'classnames'
import * as React from 'react'
import { Folder, FolderId } from 'service/folder-service'

import ListItem from './Item'

type Props = {
  resourceId: FolderId,
  resource: Folder,
  selected: boolean,
  disabled: boolean,
  onClick: () => void,
  onSelect?: () => void
}

export default (props: Props) => {
  const { resource, selected, disabled, onSelect, onClick } = props
  const buttonClasses = classNames('ui', {
    basic: !selected
  }, 'blue icon button')
  return (
    <ListItem
      heading={resource.name}
      onClick={onClick}
      disabled={disabled}
      icon='blue folder'>
      {onSelect && <button className={buttonClasses} onClick={onSelect} disabled={disabled} >
        <i className='check icon' />
      </button>
      }
    </ListItem >)
}
