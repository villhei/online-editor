import * as classNames from 'classnames'
import * as React from 'react'

interface Props {
  onSelectTree: () => void
  onSelectList: () => void
  selected: string
}

export default (props: Props) => {
  const { onSelectList, onSelectTree, selected } = props
  const treeClasses = classNames('item', {
    'active': selected === 'list'
  })
  const cardClasses = classNames('item', {
    'active': selected === 'cards'
  })

  return (<div className='ui secondary two item menu' >
    <a onClick={onSelectList} className={treeClasses}>List view</a >
    <a onClick={onSelectTree} className={cardClasses}>Card view</a>
  </div >)
}
