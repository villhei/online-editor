import * as React from 'react'
import { Link } from 'react-router-dom'
import * as classNames from 'classnames'
import { TextDocument } from 'service/document-service'
import FileDropdown from 'containers/FileDropdown'

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
  updateDocumentName: (event: React.ChangeEvent<HTMLInputElement>) => void
}

type MenuButtonProps = {
  loading: boolean,
  disabled: boolean,
  icon: string,
  onClick: () => void
}

const MenuButton = ({ loading, disabled, onClick, icon }: MenuButtonProps) => {
  const classes = classNames('ui secondary icon button', {
    'loading': loading,
    'disabled': disabled
  })
  return (<div className={'ui item'}>
    <div className={classes} onClick={onClick}>
      <i className={'icon ' + icon} />
    </div>
  </div>)
}

export default (props: Props) => {
  return (
    <div className='ui fixed inverted borderless grid menu'>
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
          icon='sync' />
        <Link className='ui item'
          to={'/view/' + props.documentId}>
          <i className='ui icon share alternate' />
        </Link>
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
      <div className='ui mobile only row'>
        <div className='ui inverted borderless menu'>
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

