import LogoutButton from 'components/toolbars/LogoutButton'
import * as React from 'react'
import { Link } from 'react-router-dom'

import MenuButton from './MenuButton'

export interface Props {
  title: string
  moveDisabled: boolean
  deleteDisabled: boolean
  refreshFolder: () => void
  createFolder: () => void
  createDocument: () => void
  moveItems: () => void
  deleteItems: () => void
}

export default (props: Props) => {
  return (
    <div className='ui row'>
      <Link to='/' className='ui item'>
        <i className='ui icon home' />
      </Link>
      <div className='item title field mobile hidden'>{props.title}</div>
      <MenuButton
        onClick={props.refreshFolder}
        loading={false}
        disabled={false}
        icon='refresh'
      />
      <MenuButton
        onClick={props.createFolder}
        loading={false}
        disabled={false}
        icon='folder'
      />
      <MenuButton
        onClick={props.createDocument}
        loading={false}
        disabled={false}
        icon='file'
      />
      <MenuButton
        onClick={props.moveItems}
        loading={false}
        disabled={props.moveDisabled}
        icon='share'
      />
      <MenuButton
        onClick={props.deleteItems}
        loading={false}
        disabled={props.deleteDisabled}
        icon='red trash'
      />
      <LogoutButton/>
    </div>
  )
}
