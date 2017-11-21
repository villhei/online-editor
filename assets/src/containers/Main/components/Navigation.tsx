import * as React from 'react'
import { Link } from 'react-router-dom'
import * as classNames from 'classnames'
import { TextDocument } from 'service/document-service'

export type NavigationProps = {
  documents: TextDocument[]
  showNavigation: boolean,
  toggleNavigation: () => void
}

export default class Navigation extends React.Component<NavigationProps, any> {
  render() {
    const { documents, showNavigation, toggleNavigation } = this.props
    const menuButtonClasses = classNames('ui dropdown item', {
      'active visible': showNavigation
    })
    const menuClasses = classNames('menu', {
      'visible': showNavigation
    })
    return (
      <div className='ui fixed inverted menu'>
        <div className='ui container'>
          <Link to='/' className='header item'>
            <i className='ui icon file text outline' />
          </Link>
          <div onClick={toggleNavigation} className={menuButtonClasses}>
            <i className='ui icon share folder' />My Files <i className='dropdown icon'></i>
            <div className={menuClasses}>
              {!documents.length && 'No documents'}
              {documents.map(({ id, name }) => <Link key={id} to={`/edit/${id}`} className='item'>{name}</Link>)}
            </div>
          </div>
          <Link to='/other' className='item' href='#'><i className='ui icon share alternate' />Share</Link>
        </div>
      </div >)
  }
}
