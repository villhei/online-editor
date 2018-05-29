import * as classNames from 'classnames'
import Modal from 'components/modals/Modal'
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
  return (
    <Modal>
      <>
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
      </>
    </Modal>
  )
}

export default ConfirmationModal
