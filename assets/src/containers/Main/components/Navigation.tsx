import * as React from 'react'
import { Link } from 'react-router-dom'
import { TextDocument } from 'service/document-service'

export type NavigationProps = {
  documents: TextDocument[]
}

export default class Navigation extends React.Component<NavigationProps, any> {
  render() {
    const { documents } = this.props
    return (
      <div className='ui fixed inverted menu'>
        <div className='ui container'>
          <Link to='/' className='header item'>
            <i className='ui icon file text outline' />
          </Link>
          <div className='ui simple dropdown item'>
            <i className='ui icon share folder' />My Files <i className='dropdown icon'></i>
            <div className='menu'>
              {documents.map(({ id, name }) => <Link key={id} to={`/edit/${id}`} className='item'>{name}</Link>)}
            </div>
          </div>
          <Link to='/other' className='item' href='#'><i className='ui icon share alternate' />Share</Link>
        </div>
      </div >)
  }
}
