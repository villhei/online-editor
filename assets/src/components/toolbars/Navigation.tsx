import * as React from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <div className='ui fixed inverted borderless grid menu'>
      <div className='ui row'>
        <Link to='/' className='ui item'>
          <i className='ui icon home outline' />
        </Link>
        <div className='header item title field'>m4d edi70r</div>
      </div >
    </div>)
}

export default Navigation