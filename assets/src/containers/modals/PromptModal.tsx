import * as React from 'react'
import * as ReactDOM from 'react-dom'
import PromptModalView from 'components/modals/PromptModal'

export type Props = {
  icon: string,
  title: string,
  message: string,
  placeholder: string,
  value: string,
  isValid: boolean,
  onConfirm: () => any,
  onChange: (event: React.FormEvent<HTMLInputElement>) => any,
  onCancel: () => any
}

export type State = {
  response: string
}

class PromptModal extends React.Component<Props, any> {

  handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.props.onChange(event)
  }

  handleConfirm = () => {
    this.props.onConfirm()
  }

  render() {
    const modalContainer = (document.getElementById('modal') as HTMLDivElement)
    const { icon, title, message, placeholder, value, isValid, onChange, onCancel, onConfirm } = this.props

    return ReactDOM.createPortal(<PromptModalView
      title={title}
      icon={icon}
      value={value}
      placeholder={placeholder}
      message={message}
      hasError={!isValid}
      onChange={onChange}
      onConfirm={this.handleConfirm}
      onCancel={onCancel} />
      , modalContainer)
  }
}

export default PromptModal
