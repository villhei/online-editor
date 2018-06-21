import * as React from 'react'
import { Link } from 'react-router-dom'

import MenuButton from './MenuButton'

export interface Props {
  title: string,
  folderUrl: string,
  saveDisabled: boolean,
  saving: boolean,
  refreshing: boolean,
  deleting: boolean,
  refreshDocument: () => void
  updateDocument: () => void,
  deleteDocument: () => void,
  viewDocument: () => void
  onNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default (props: Props) => {
  return (
    <div className='ui row'>
      <Link className='ui item' to={props.folderUrl}>
        <i className='ui icons'>
          <i className='folder icon' />
        </i>
      </Link>
      <div className='item title field mobile hidden'>
        <div className='ui basic inverted labeled input'>
          <input type='text' value={props.title} onChange={props.onNameChange} />
        </div>
      </div>
      <MenuButton
        onClick={props.refreshDocument}
        loading={props.refreshing}
        disabled={false}
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
        disabled={props.saveDisabled}
        icon='save outline' />
      <MenuButton
        onClick={props.deleteDocument}
        loading={props.deleting}
        disabled={false}
        icon='trash alternate' />
    </div>
  )
}
