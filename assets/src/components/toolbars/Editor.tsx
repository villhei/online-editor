import * as React from 'react'
import { Link } from 'react-router-dom'
import * as classNames from 'classnames'
import { TextDocument } from 'service/document-service'
import FileDropdown from 'containers/FileDropdown'

type Props = {
  title: string,
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

export default (props: Props) => {
  const refreshClass = classNames('ui item', {
    'loading': props.refreshing,
    'disabled': props.disabled
  }, 'button')
  const saveClass = classNames('ui item', {
    'loading': props.saving,
    'disabled': Boolean(props.disabled || props.saveDisabled)
  }, 'button')
  const deleteClass = classNames('ui item', {
    'loading': props.deleting,
    'disabled': props.disabled
  }, 'button')
  return (
    <div className='ui fixed inverted massive menu'>
      <Link to='/' className='ui item'>
        <i className='ui icon home outline' />
      </Link>}
      <div className='ui transparent inverted title field input'>
        <input type='text' value={props.title} onChange={props.updateDocumentName} />
      </div>
      <FileDropdown />
      <button className={refreshClass} onClick={props.refreshDocument}>
        <i className='ui icon refresh text outline' />
      </button>
      <button className={saveClass} onClick={props.updateDocument}>
        <i className='ui icon save text outline' />
      </button>
      <button className={deleteClass} onClick={props.deleteDocument}>
        <i className='ui icon delete text outline' />
      </button>
    </div>
  )
}

