import * as classNames from 'classnames'
import Modal from 'components/modals/Modal'
import * as React from 'react'

interface Props {
  title: string,
  message: string,
  placeholder: string,
  icon: string,
  value: string,
  hasError: boolean,
  onConfirm: () => void,
  onChange: (event: React.FormEvent<HTMLInputElement>) => void,
  onCancel: () => void
}
const ConfirmationModal = (props: Props) => {
  const iconClasses = classNames('icon', props.icon)
  const inputClasses = classNames('ui fluid inverted input', {
    'error': props.hasError
  })
  return (
    <Modal>
      <>
        <div className='ui icon header'>
          <i className={iconClasses} />
          {props.title}
        </div>
        <div className='content'>
          <p>{props.message}</p>
          <div className={inputClasses}>
            <input
              ref={(input) => {
                input && input.focus()
              }}
              value={props.value}
              onChange={props.onChange}
              type='text'
              placeholder={props.placeholder} />
          </div>
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
            disabled={props.hasError}
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
