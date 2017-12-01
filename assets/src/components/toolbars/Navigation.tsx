import * as React from 'react'

import { Link } from 'react-router-dom'
import * as classNames from 'classnames'
import { TextDocument } from 'service/document-service'

type Props = {
  documents: Array<TextDocument>,
  showNavigation: boolean,
  toggleNavigation: () => void
}

export default (props: Props) => {
  const { documents, showNavigation, toggleNavigation } = props
  const menuButtonClasses = classNames('ui dropdown item', {
    'active visible': showNavigation
  })
  const menuClasses = classNames('menu', {
    'visible': showNavigation
  })
  return (
    <div className='ui fixed inverted massive borderless menu'>
      <Link to='/' className='ui item'>
        <i className='ui icon file text outline' />
      </Link>
      <div className='header item'>m4d edi70r</div>
      <div onClick={toggleNavigation} className={menuButtonClasses}>
        <i className='ui icon share folder' />My Files <i className='dropdown icon'></i>
        <div className={menuClasses} onClick={(event: React.MouseEvent<HTMLDivElement>) => { event.stopPropagation() }} >
          {!documents.length && <div className='item'>No documents</div>}
          {documents.map(({ id, name }) => <Link key={id} to={`/edit/${id}`} className='item'>{name}</Link>)}
        </div>
      </div>
    </div >)
}