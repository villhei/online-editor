import * as classNames from 'classnames'
import * as React from 'react'
import { Ordering } from 'reducers/page'
interface Props {
  onClickColumn: (column: 'name' | 'inserted_at' | 'updated_at') => void
  ordering: Ordering
}

function getCaret(ordering: Ordering, itemName: string): JSX.Element {
  if (ordering.orderBy !== itemName) {
    return <i className='icon small disabled circle' />
  }
  const iconClasses = classNames('icon small chevron circle', {
    up: ordering.reverse,
    down: !ordering.reverse
  })
  return <i className={iconClasses} />
}
export default (props: Props) => {
  const { onClickColumn, ordering } = props
  return (
    <div className='inverted item' >
      <div className='ui content one column middle aligned grid'>
        <div className='ui row'>
          <div className='ui seven wide column' onClick={() => onClickColumn('name')} >
            {getCaret(ordering, 'name')}
            <b>Name</b>
          </div>
          <div className='ui three wide column' onClick={() => onClickColumn('updated_at')} >
            {getCaret(ordering, 'updated_at')}
            <b>Last updated</b>
          </div>
          <div className='ui three wide column' onClick={() => onClickColumn('inserted_at')}>
            {getCaret(ordering, 'inserted_at')}
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
