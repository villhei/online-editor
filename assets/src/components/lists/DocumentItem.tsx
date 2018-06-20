import * as classNames from 'classnames'
import ListItem from 'components/lists/ListItem'
import * as React from 'react'
import { TextDocument } from 'service/document-service'

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
      updated={resource.updated_at}
      created={resource.inserted_at}
      onClick={onClick}
      onClickIcon={onClickIcon}
      icon='teal file'
      secondaryIcon={resource.starred ? 'yellow star' : 'grey star'}>
      <button className={buttonClasses} onClick={onSelect} >
        <i className='check icon' />
      </button>
    </ListItem >)
}
