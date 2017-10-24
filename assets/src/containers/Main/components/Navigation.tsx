import * as React from 'react'
import { Link } from 'react-router-dom'

import { MOCK_FILES } from 'mocks/files'

export default class Navigation extends React.Component<any, any> {
  render() {
    return (
      <div className='ui fixed inverted menu'>
        <div className='ui container'>
          <Link to='/' className='header item'>
            <i className='ui icon file text outline' />
          </Link>
          <div className='ui simple dropdown item'>
            <i className='ui icon share folder' />My Files <i className='dropdown icon'></i>
            <div className='menu'>
              {MOCK_FILES.map(({ name }) => <Link key={name} to={`/edit/${name}`} className='item'>{name}</Link>)}
            </div>
          </div>
          <Link to='/other' className='item' href='#'><i className='ui icon share alternate' />Share</Link>
        </div>
      </div >)
  }
}
