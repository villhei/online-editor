import ConfirmationModal from 'components/modals/ConfirmationModal'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

export interface Props {
  icon: string,
  title: string,
  message: string,
  onConfirm: () => void,
  onCancel: () => void
}

class Modal extends React.Component<Props> {
  render() {
    const modalContainer = (document.getElementById('modal') as HTMLDivElement)
    const { icon, title, message, onCancel, onConfirm } = this.props

    return ReactDOM.createPortal(<ConfirmationModal
      title={title}
      icon={icon}
      message={message}
      onConfirm={onConfirm}
      onCancel={onCancel} />, modalContainer)
  }
}

export default Modal
