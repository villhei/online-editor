import * as classNames from 'classnames'
import * as React from 'react'

type Props = {
  header: JSX.Element | string
  disabled?: boolean,
  selected?: boolean,
  children?: JSX.Element | string,
  icon: {
    name: string,
    color: string
  },
  buttonAction: () => void
}

export default (props: Props) => {
  const {
    selected,
    header,
    icon: {
      name,
      color },
    buttonAction,
    disabled } = props
  const cardClasses = classNames(
    'ui',
    { 'blue raised': selected },
    'card'
  )
  const iconClasses = classNames(
    'huge right floated',
    color,
    name, {
      'disabled': disabled
    },
    'icon')
  const action = !disabled ? buttonAction : () => null
  return (
    <a className={cardClasses} onClick={action}>
      <div className='content'>
        <i className={iconClasses}></i>
        <div className='header'>
          {header}
        </div>
        {props.children}
      </div>
    </a >
  )
}
