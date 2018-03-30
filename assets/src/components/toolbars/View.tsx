import * as React from 'react'
import { Link } from 'react-router-dom'
import * as classNames from 'classnames'
import MenuButton from './MenuButton'

type Props = {
  title: string,
  editDisabled: boolean,
  refreshing: boolean,
  editDocument: () => void,
  refreshDocument: () => void
}

export default (props: Props) => {
  const { title, editDisabled, editDocument, refreshDocument, refreshing } = props
  return (
    <div className='ui fixed grid menu'>
      <div className='ui row'>
        <Link to='/' className='ui item'>
          <i className='ui icon home' />
        </Link>
        <div className='header item large title field'><h3>{title}</h3></div>
        <MenuButton
          loading={refreshing}
          disabled={false}
          icon='refresh'
          onClick={refreshDocument}>
        </MenuButton>
        <MenuButton
          loading={false}
          disabled={editDisabled}
          icon='edit'
          onClick={editDocument}>
        </MenuButton>
      </div>
    </div >
  )
}

