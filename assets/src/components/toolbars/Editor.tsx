import * as React from 'react'
import { Link } from 'react-router-dom'
import * as classNames from 'classnames'
import { TextDocument } from 'service/document-service'
import FileDropdown from 'containers/FileDropdown'

type Props = {
  title: string,
  disabled: boolean,
  saveDisabled: boolean,
  refreshDocument: () => void
  updateDocument: () => void,
  deleteDocument: () => void,
  updateDocumentName: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default (props: Props) => {
  const actionItemClass = classNames('ui item', {
    'disabled': props.disabled
  })
  const saveClass = classNames('ui item', {
    'disabled': Boolean(props.disabled || props.saveDisabled)
  })
  return (
    <div className='ui fixed inverted massive menu'>
      <Link to='/' className='ui item'>
        <i className='ui icon home outline' />
      </Link>}
      <div className='ui transparent inverted title field input'>
        <input type='text' value={props.title} onChange={props.updateDocumentName} />
      </div>
      <FileDropdown />
      <a className={actionItemClass} onClick={props.refreshDocument}>
        <i className='ui icon refresh text outline' />
      </a>
      <a className={saveClass} onClick={props.updateDocument}>
        <i className='ui icon save text outline' />
      </a>
      <a className={actionItemClass} onClick={props.deleteDocument}>
        <i className='ui icon delete text outline' />
      </a>
    </div>
  )
}

