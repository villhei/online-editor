import * as React from 'react'

interface Props {
  onClickColumn: (column: 'name' | 'inserted_at' | 'updated_at') => void
}

export default (props: Props) => {
  const { onClickColumn } = props
  return (
    <div className='inverted item' >
      <div className='ui content one column middle aligned grid'>
        <div className='ui row'>
          <div className='ui seven wide column' onClick={() => onClickColumn('name')} >
            <i className='large icons'>
              <i className='icon circular inverted grey file' />
            </i>
            <b>Name</b>
          </div>
          <div className='ui three wide column' onClick={() => onClickColumn('updated_at')} >
            <b>Last updated</b>
          </div>
          <div className='ui three wide column' onClick={() => onClickColumn('inserted_at')}>
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
