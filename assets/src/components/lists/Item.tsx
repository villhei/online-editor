import * as classNames from 'classnames'
import * as React from 'react'

type Props = {
  children?: JSX.Element | string,
  onClick: () => void,
  onClickIcon: () => void,
  heading: string,
  icon: string,
  secondaryIcon?: string,
  disabled?: boolean
}

export default (props: Props) => {
  const { disabled, heading, icon, onClick, onClickIcon, secondaryIcon } = props
  const primaryIconClasses = classNames('circular inverted', {
    'disabled': disabled
  }, icon, 'icon')
  const secondaryIconClasses = classNames('top left corner', secondaryIcon, 'icon')
  return (
    < div className='item' >
      <div className='ui content grid'>
        <div className='ui row'>
          <div className='ui twelve wide column'>
            <i onClick={onClickIcon} className='large icons'>
              <i className={primaryIconClasses} />
              {Boolean(secondaryIcon) && <i className={secondaryIconClasses} />}
            </i>
            <a onClick={onClick} >{heading}</a>
          </div>
          <div className='ui two wide column'>
            {props.children}
          </div>
        </div>
      </div>
    </div >)
}
