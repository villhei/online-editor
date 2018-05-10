import * as classNames from 'classnames'
import * as React from 'react'
import { Folder, FolderId } from 'service/folder-service'

import ListItem from './Item'

type Props = {
  resourceId: FolderId,
  resource: Folder,
  selected: boolean,
  onSelect: () => void,
  onClick: () => void
}

export default (props: Props) => {
  const { resource, selected, onSelect, onClick } = props
  const buttonClasses = classNames('ui', {
    basic: !selected
  }, 'blue icon button')
  return (
    <ListItem
      heading={resource.name}
      onClick={onClick}
      icon='blue folder'>
      <button className={buttonClasses} onClick={onSelect} >
        <i className='check icon' />
      </button>
    </ListItem >)
}