import * as React from 'react'
import * as classNames from 'classnames'

type Props = {
  header: string
  disabled?: boolean,
  children?: JSX.Element | string | any,
  icon: {
    name: string,
    color: string
  },
  buttonAction: () => any
}

export default (props: Props) => {
  const { header, icon: { name, color }, buttonAction, disabled } = props
  const iconClasses = classNames('huge right floated', color, name, {
    'disabled': disabled
  }, 'icon')
  const action = !disabled ? buttonAction : () => null
  return (
    <a className='ui card' onClick={action}>
      <div className='content'>
        <i className={iconClasses}></i>
        <div className='small header'>
          {header}
        </div>
        {props.children}
      </div>
    </a >
  )
}
