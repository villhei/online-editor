import * as React from 'react'

const LogoutButton = () => (
  <a className='ui right item' href='/api/auth/logout'>
    <i className='ui icon'>
      <i className='red sign-out icon' />
    </i>
  </a>
)

export default LogoutButton
