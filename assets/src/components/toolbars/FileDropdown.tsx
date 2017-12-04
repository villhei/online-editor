import * as React from 'react'
import * as classNames from 'classnames'
import { Link } from 'react-router-dom'
import { TextDocument } from 'service/document-service'

type Props = {
  documents: Array<TextDocument>,
  showNavigation: boolean,
  toggleNavigation: () => void
}

const stopPropagation = (event: React.MouseEvent<HTMLDivElement>) => { event.stopPropagation() }

const FileDropdown = (props: Props) => {
  const { toggleNavigation, documents, showNavigation } = props

  const dropdownClass = classNames('ui dropdown item', {
    'active visible': showNavigation
  })
  const itemClasses = classNames('menu', {
    'visible': showNavigation
  })
  return (
    <div onClick={toggleNavigation} className={dropdownClass}>
      <i className='ui icon share folder' />My Files <i className='dropdown icon'></i>
      <div className={itemClasses} onClick={stopPropagation} >
        {!documents.length && <div className='item'>No documents</div>}
        {documents.map(({ id, name }) => <Link key={id} to={`/edit/${id}`} className='item'>{name}</Link>)}
      </div>
    </div>)
}

export default FileDropdown