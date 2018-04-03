import * as React from 'react'
import * as classNames from 'classnames'

type Props = {
  header: string
  buttonText: string,
  children?: JSX.Element | string | any,
  icon: {
    name: string,
    color: string
  },
  buttonAction: () => any
}

export default (props: Props) => {
  const { header, buttonText, icon: { name, color }, buttonAction } = props
  const iconClasses = classNames('huge right floated', color, name, 'icon')
  return (
    <div className='ui card'>
      <div className='content'>
        <i className={iconClasses}></i>
        <div className='small header'>
          {header}
        </div>
        {props.children}
      </div>
      <div className='ui bottom attached blue basic button' onClick={buttonAction}>
        {buttonText}
      </div>
    </div >
  )
}
