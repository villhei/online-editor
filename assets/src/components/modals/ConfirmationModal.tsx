import * as classNames from 'classnames'
import * as React from 'react'

type Props = {
  title: string,
  message: string,
  icon: string,
  onConfirm: () => void,
  onCancel: () => void
}
const ConfirmationModal = (props: Props) => {
  const iconClasses = classNames('icon', props.icon)
  const dimmerClasses = classNames('ui dimmer visible active')
  return (
    <div className={dimmerClasses}>
      <div className='ui mini basic modal transition visible active'>
        <div className='ui icon header'>
          <i className={iconClasses} />
          {props.title}
        </div>
        <div className='content'>
          <p>{props.message}</p>
        </div>
        <div className='actions'>
          <button
            className='ui red basic cancel inverted button'
            onClick={props.onCancel}>
            <i className='remove icon' />
            Cancel
          </button>
          <button
            className='ui green ok inverted button'
            onClick={props.onConfirm}>
            <i className='checkmark icon' />
            Ok
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal
