import * as classNames from 'classnames'
import * as React from 'react'
import { TextDocument } from 'service/document-service'

import ListItem from './Item'

interface Props {
  resource: TextDocument,
  selected: boolean,
  onSelect: () => void,
  onClick: () => void,
  onClickIcon: () => void
}

export default (props: Props) => {
  const { resource, selected, onSelect, onClick, onClickIcon } = props
  const buttonClasses = classNames('ui', {
    basic: !selected
  }, 'blue icon button')
  return (
    <ListItem
      heading={resource.name}
      onClick={onClick}
      onClickIcon={onClickIcon}
      icon='teal file'
      secondaryIcon={resource.starred ? 'yellow star' : 'grey star'}>
      <button className={buttonClasses} onClick={onSelect} >
        <i className='check icon' />
      </button>
    </ListItem >)
}
