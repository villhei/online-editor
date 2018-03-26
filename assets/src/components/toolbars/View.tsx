import * as React from 'react'
import { Link } from 'react-router-dom'
import * as classNames from 'classnames'

type Props = {
  title: string
}

export default (props: Props) => {
  return (
    <div className='ui fixed inverted borderless grid menu'>
      <div className='ui row'>
        <Link to='/' className='ui item'>
          <i className='ui icon home' />
        </Link>
        <div className='header item title field'>{props.title || 'Loading...'}</div>
      </div>
    </div >
  )
}

