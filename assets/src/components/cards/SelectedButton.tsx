import * as classNames from 'classnames'
import * as React from 'react'

type Props = {
  selected: boolean,
  onSelect: (event: React.MouseEvent<HTMLElement>) => void
}

export default (props: Props) => {
  const { selected, onSelect } = props
  const buttonColor = {
    'grey': !selected,
    'blue': selected
  }
  const iconColor = {
    'grey': !selected,
    'white': selected
  }
  const buttonClasses = classNames('ui right floated',
    { 'basic': !selected },
    buttonColor, 'icon button')
  const iconClasses = classNames(iconColor, 'icon check')
  return (
    <div className={buttonClasses} onClick={onSelect}>
      <i className={iconClasses} />
    </div>
  )
}
