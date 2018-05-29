import * as classNames from 'classnames'
import * as React from 'react'

type Props = {
  children?: JSX.Element | string,
  onClick: () => void,
  heading: string,
  icon: string,
  disabled?: boolean
}

export default (props: Props) => {
  const { disabled, heading, icon, onClick } = props
  const iconClasses = classNames('circular inverted large', {
    'disabled': disabled
  }, icon, 'icon')
  return (
    < div className='item' >
      <div className='ui content grid'>
        <div className='ui row'>
          <div className='ui twelve wide column'>
            <i onClick={onClick} className={iconClasses}></i>
            <a onClick={onClick} >{heading}</a>
          </div>
          <div className='ui two wide column'>
            {props.children}
          </div>
        </div>
      </div>
    </div >)
}
