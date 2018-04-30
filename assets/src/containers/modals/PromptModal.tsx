import PromptModalView from 'components/modals/PromptModal'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

export type Props = {
  icon: string,
  title: string,
  message: string,
  placeholder: string,
  value: string,
  isValid: boolean,
  onConfirm: () => void,
  onChange: (event: React.FormEvent<HTMLInputElement>) => void,
  onCancel: () => void
}

export type State = {
  response: string
}

class PromptModal extends React.Component<Props> {

  handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.props.onChange(event)
  }

  handleConfirm = () => {
    this.props.onConfirm()
  }

  render() {
    const modalContainer = (document.getElementById('modal') as HTMLDivElement)
    const { icon, title, message, placeholder, value, isValid, onChange, onCancel } = this.props

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
