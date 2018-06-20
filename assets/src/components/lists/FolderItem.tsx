import * as classNames from 'classnames'
import ListItem from 'components/lists/ListItem'
import * as React from 'react'
import { Folder } from 'service/folder-service'

interface Props {
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
      updated={resource.updated_at}
      created={resource.inserted_at}
      onClick={onClick}
      onClickIcon={onClick}
      disabled={disabled}
      icon='blue folder'>
      {onSelect && <button className={buttonClasses} onClick={onSelect} disabled={disabled} >
        <i className='check icon' />
      </button>
      }
    </ListItem >)
}
