import * as classNames from 'classnames'
import { DateTime } from 'luxon'
import * as React from 'react'

interface Props {
  children?: JSX.Element | string,
  onClick: () => void,
  onClickIcon: () => void,
  heading: string,
  icon: string,
  updated: string,
  created: string,
  secondaryIcon?: string,
  disabled?: boolean
}

function formatTimestamp(timestamp: string): string {
  const dateTime = DateTime.fromISO(timestamp, {
    zone: 'UTC'
  }).toLocal()
  return [
    dateTime.toLocaleString(DateTime.DATE_SHORT),
    dateTime.toLocaleString(DateTime.TIME_24_SIMPLE)
  ].join(' ')
}

export default (props: Props) => {
  const { disabled, heading, icon, onClick, updated, created, onClickIcon, secondaryIcon } = props
  const primaryIconClasses = classNames('circular inverted', {
    'disabled': disabled
  }, icon, 'icon')
  const secondaryIconClasses = classNames('top left corner', secondaryIcon, 'icon')
  return (
    < div className='item ' >
      <div className='ui content one column middle aligned grid'>
        <div className='ui row'>
          <div className='ui seven wide column'>
            <i onClick={onClickIcon} className='large icons'>
              <i className={primaryIconClasses} />
              {Boolean(secondaryIcon) && <i className={secondaryIconClasses} />}
            </i>
            <a onClick={onClick} >{heading}</a>
          </div>
          <div className='ui three wide column'>
            {formatTimestamp(updated)}
          </div>
          <div className='ui three wide column'>
            {formatTimestamp(created)}
          </div>
          <div className='ui three wide right aligned column'>
            {props.children}
          </div>
        </div>
      </div>
    </div >)
}
