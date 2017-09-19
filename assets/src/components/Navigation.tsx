import * as React from 'react'

export default class Navigation extends React.Component<any, any> {
  render () {
    return (
      <div className='ui fixed inverted menu'>
        <div className='ui container'>
          <a href='#' className='header item'>
            <img className='logo' src='images/phoenix.png' />
            Project Name
          </a>
          <a href='#' className='item'>
            Home
          </a>
          <div className='ui simple dropdown item'>
            Dropdown <i className='dropdown icon'></i>
            <div className='menu'>
              <a className='item' href='#'>Link Item</a>
              <a className='item' href='#'>Link Item</a>
              <div className='divider'></div>
              <div className='header'>Header Item</div>
              <div className='item'>
                <i className='dropdown icon'></i>
                Sub Menu
            <div className='menu'>
                  <a className='item' href='#'>Link Item</a>
                  <a className='item' href='#'>Link Item</a>
                </div>
              </div>
              <a className='item' href='#'>Link Item</a>
            </div>
          </div>
        </div>
      </div>)
  }
}
