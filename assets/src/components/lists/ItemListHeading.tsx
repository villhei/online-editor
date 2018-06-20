import * as React from 'react'

export default () => {
  return (
    <div className='inverted item' >
      <div className='ui content one column middle aligned grid'>
        <div className='ui row'>
          <div className='ui seven wide column'>
            <i className='large icons'>
              <i className='icon circular inverted grey file' />
            </i>
            <b>Name</b>
          </div>
          <div className='ui three wide column'>
            <b>Last updated</b>
          </div>
          <div className='ui three wide column'>
            <b>Created</b>
          </div>
          <div className='ui three wide right aligned column'>
            <b>Actions</b>
          </div>
        </div>
      </div>
    </div >
  )
}
