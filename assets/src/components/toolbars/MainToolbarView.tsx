import * as React from 'react'
import { Link } from 'react-router-dom'
import MenuButton from './MenuButton'

export type Props = {
  title: string,
  refreshing: boolean,
  disabled: boolean,
  refreshFolder: () => void
  createFolder: () => void,
  createDocument: () => void
}

export default (props: Props) => {
  return (
    <div className='ui row'>
      <Link to='/' className='ui item'>
        <i className='ui icon home' />
      </Link>
      <div className='item title field mobile hidden'>
        {props.title}
      </div>
      <MenuButton
        onClick={props.refreshFolder}
        loading={props.refreshing}
        disabled={props.disabled}
        icon='refresh' />
      <MenuButton
        onClick={props.createFolder}
        loading={false}
        disabled={false}
        icon='folder'>
      </MenuButton>
      <MenuButton
        onClick={props.createDocument}
        loading={false}
        disabled={false}
        icon='file'>
      </MenuButton>
    </div>
  )
}
