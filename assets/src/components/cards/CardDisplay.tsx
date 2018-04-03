import * as React from 'react'
import * as classNames from 'classnames'

type Props = {
  header: string
  buttonText: string,
  icon: {
    name: string,
    color: string
  },
  buttonAction: () => any
}

export default (props: Props) => {
  const { header, buttonText, icon: { name, color }, buttonAction } = props
  const iconClasses = classNames('large', color, name, 'icon')
  return (
    <div className='ui card'>
      <div className='content'>
        <div className='header'>
          <i className={iconClasses} />
          {header}
        </div>
      </div>
      <div className='ui bottom attached blue basic button' onClick={buttonAction}>
        {buttonText}
      </div>
    </div >
  )
}
