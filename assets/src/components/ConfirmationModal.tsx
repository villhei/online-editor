import * as React from 'react';
import * as classNames from 'classnames'

type Props = {
  title: string,
  message: string,
  visible: boolean,
  icon: string,
  onConfirm: () => void,
  onCancel: () => void
}
const ConfirmationModal = (props: Props) => {
  const iconClasses = classNames('icon', props.icon)
  const dimmerClasses = classNames('ui dimmer', {
    'transition visible active': props.visible
  })
  return (
    <div className={dimmerClasses}>
      <div className="ui mini basic modal transition visible active scrolling" style={{ display: 'block' }}>
        <div className="ui icon header">
          <i className={iconClasses} />
          {props.title}
        </div>
        <div className="content">
          <p>{props.message}</p>
        </div>
        <div className="actions">
          <button
            className="ui red basic cancel inverted button"
            onClick={props.onCancel}>
            <i className='remove icon' />
            Cancel
          </button>
          <button
            className="ui green ok inverted button"
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