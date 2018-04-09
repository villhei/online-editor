import * as classNames from 'classnames'
import * as React from 'react'
import { Folder } from 'service/folder-service'

import CardDisplay from './CardDisplay'

type Props = {
  folder: Folder,
  disabled: boolean,
  buttonAction: () => any
}

export default (props: Props) => {
  const {
    folder,
    buttonAction,
    disabled } = props

  const cardClasses = classNames(
    'ui',
    { 'blue raised': true },
    'card'
  )
  const iconClasses = classNames(
    'huge left floated',
    'blue folder', {
      'disabled': disabled
    },
    'icon')
  return (
    <a className={cardClasses} onClick={() => null}>
      <div className='content'>
        <i className={iconClasses}></i>
        <div className='header'>
          {folder.name}
        </div>
        <div className='meta'>
          {folder.children.length} folders<br />
          {folder.documents.length} documents
      </div>
        <button className='ui left floated basic icon button'
          disabled={disabled}
          onClick={buttonAction}>
          <i className='ui right floated huge ellipsis horizontal icon'></i>
        </button>
      </div>
    </a >
  )
}
