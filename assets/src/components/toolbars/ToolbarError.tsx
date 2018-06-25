import * as React from 'react'
import { Link } from 'react-router-dom'

export default () => {
  return (
    <div className='ui row'>
      <Link to='/' className='ui item'>
        <i className='ui exclamation circle icon' />
      </Link>
    </div >
  )
}
