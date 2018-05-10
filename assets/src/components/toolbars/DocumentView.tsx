import * as React from 'react'
import { Link } from 'react-router-dom'

import MenuButton from './MenuButton'

type Props = {
  title: string,
  editDocument: () => void,
  refreshDocument: () => void
}

export default (props: Props) => {
  const { title, editDocument, refreshDocument } = props
  return (
    <div className='ui row'>
      <Link to='/' className='ui item'>
        <i className='ui icon home' />
      </Link>
      <div className='item title field mobile hidden'>
        <h3>{title}</h3>
      </div>
      <MenuButton
        loading={false}
        disabled={false}
        icon='refresh'
        onClick={refreshDocument}>
      </MenuButton>
      <MenuButton
        loading={false}
        disabled={false}
        icon='edit'
        onClick={editDocument}>
      </MenuButton>
    </div>
  )
}
