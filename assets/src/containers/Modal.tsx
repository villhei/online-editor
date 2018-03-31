import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect, Dispatch } from 'react-redux'
import { RootState } from '../reducer'
import { modalConfirm, modalClear } from 'actions/page-actions'
import ConfirmationModal from 'components/ConfirmationModal'

type Props = {
  icon: string,
  title: string,
  message: string,
  visible: boolean,
  confirm: () => any,
  dismiss: () => any
}

class Modal extends React.Component<Props, any> {
  render() {
    const { icon, title, message, dismiss, visible, confirm } = this.props
    return <ConfirmationModal
      visible={visible}
      title={title}
      icon={icon}
      message={message}
      onConfirm={confirm}
      onCancel={dismiss} />
  }
}

const mapStateToProps = ({ model, ui, state }: RootState) => {
  const { icon, visible, title, message } = ui.page.modal
  return {
    icon,
    title,
    message,
    visible
  }
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => {
  return {
    dismiss: () => dispatch(modalClear(undefined)),
    confirm: () => dispatch(modalConfirm(undefined))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)