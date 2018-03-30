import * as React from 'react'
import { Link } from 'react-router-dom'
import * as classNames from 'classnames'
import MenuButton from './MenuButton'

type Props = {
  title: string,
  editDisabled: boolean,
  editDocument: () => void
}

export default (props: Props) => {
  return (
    <div className='ui fixed grid menu'>
      <div className='ui row'>
        <Link to='/' className='ui item'>
          <i className='ui icon home' />
        </Link>
        <div className='header item large title field'><h3>{props.title}</h3></div>
        <MenuButton
          loading={false}
          disabled={props.editDisabled}
          icon='edit'
          onClick={props.editDocument}>
        </MenuButton>
      </div>
    </div >
  )
}

