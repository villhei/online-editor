import * as React from 'react'
import { Link } from 'react-router-dom'

import MenuButton from './MenuButton'

export interface Props {
  title: string,
  documentId: string,
  disabled: boolean,
  saveDisabled: boolean,
  saving: boolean,
  refreshing: boolean,
  deleting: boolean,
  refreshDocument: () => void
  updateDocument: () => void,
  deleteDocument: () => void,
  viewDocument: () => void
  updateDocumentName: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default (props: Props) => {
  return (
    <div className='ui row'>
      <Link to='/' className='ui item'>
        <i className='ui icon home' />
      </Link>
      <div className='item title field mobile hidden'>
        <div className='ui basic inverted labeled input'>
          <input type='text' value={props.title} onChange={props.updateDocumentName} />
        </div>
      </div>
      <MenuButton
        onClick={props.refreshDocument}
        loading={props.refreshing}
        disabled={props.disabled}
        icon='refresh' />
      <MenuButton
        onClick={props.viewDocument}
        loading={false}
        disabled={false}
        icon='share alternate'>
      </MenuButton>
      <MenuButton
        onClick={props.updateDocument}
        loading={props.saving}
        disabled={props.disabled || props.saveDisabled}
        icon='save outline' />
      <MenuButton
        onClick={props.deleteDocument}
        loading={props.deleting}
        disabled={props.disabled}
        icon='trash alternate' />
    </div>
  )
}
