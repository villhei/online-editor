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

const ESC_KEY = 27
const ENTER_KEY = 13

export type State = {
  response: string
}

class PromptModal extends React.Component<Props> {
  componentDidMount() {
    window.addEventListener('keydown', this.dismissListener)
    window.addEventListener('keydown', this.onConfirmListener)
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.dismissListener)
    window.removeEventListener('keydown', this.onConfirmListener)
  }

  dismissListener = (event: KeyboardEvent) => {
    if (event.keyCode === ESC_KEY) {
      this.props.onCancel()
    }
  }

  onConfirmListener = (event: KeyboardEvent) => {
    console.log('onConfirmListener', this.props)
    if (event.keyCode === ENTER_KEY) {
      console.log(this.props)
      if (this.props.isValid) {
        this.handleConfirm()
      }
    }
  }

  handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.props.onChange(event)
  }

  handleConfirm = () => {
    const { onConfirm } = this.props
    onConfirm()
  }

  render() {
    const modalContainer = (document.getElementById('modal') as HTMLDivElement)
    const { icon, title, message, placeholder, value, isValid, onChange, onCancel } = this.props
    console.log('props', this.props)
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
