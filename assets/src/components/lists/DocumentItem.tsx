import * as classNames from 'classnames'
import * as React from 'react'
import { TextDocument } from 'service/document-service'

import ListItem from './Item'

type Props = {
  resource: TextDocument,
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
      icon='teal file'>
      <button className={buttonClasses} onClick={onSelect} >
        <i className='check icon' />
      </button>
    </ListItem >)
}
