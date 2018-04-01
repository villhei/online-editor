import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { connect, Dispatch } from 'react-redux'
import { RootState } from '../reducer'
import ConfirmationModal from 'components/ConfirmationModal'

export type Props = {
  icon: string,
  title: string,
  message: string,
  onConfirm: () => any,
  onCancel: () => any
}

class Modal extends React.Component<Props, any> {
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
