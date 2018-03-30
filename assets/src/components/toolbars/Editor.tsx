import * as React from 'react'
import { Link } from 'react-router-dom'
import { TextDocument } from 'service/document-service'
import FileDropdown from 'containers/FileDropdown'
import MenuButton from './MenuButton'

type Props = {
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
  viewDocument: () => void,
  updateDocumentName: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default (props: Props) => {
  return (
    <div className='ui fixed borderless grid menu'>
      <div className='ui computer tablet only row'>
        <Link to='/' className='ui item'>
          <i className='ui icon home' />
        </Link>
        <div className='ui transparent inverted title field input'>
          <input type='text' value={props.title} onChange={props.updateDocumentName} />
        </div>
        <FileDropdown />
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
          icon='red trash alternate' />
      </div>
      <div className='ui mobile only row'>
        <div className='ui borderless menu'>
          <Link to='/' className='ui item'>
            <i className='ui icon home' />
          </Link>}
          <FileDropdown />
          <MenuButton
            onClick={props.refreshDocument}
            loading={props.refreshing}
            disabled={props.disabled}
            icon='sync alternate' />
          <Link className='ui item'
            to={'/view/' + props.documentId}>
            <i className='ui icon share alternate' />
          </Link>
          <MenuButton
            onClick={props.updateDocument}
            loading={props.saving}
            disabled={props.disabled}
            icon='save outline' />
          <MenuButton
            onClick={props.deleteDocument}
            loading={props.deleting}
            disabled={props.disabled}
            icon='trash alternate' />
        </div>
      </div>
    </div >
  )
}

