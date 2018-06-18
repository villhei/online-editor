import PromptModalView from 'components/modals/PromptModal'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

export interface Props {
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

export interface State {
  listeners: Array<(event: KeyboardEvent) => void>
}

function getListeners(context: PromptModal) {
  return [
    (event: KeyboardEvent) => {
      if (event.keyCode === ENTER_KEY) {
        if (context.props.isValid) {
          context.handleConfirm()
        }
      }
    },
    (event: KeyboardEvent) => {
      if (event.keyCode === ESC_KEY) {
        context.props.onCancel()
      }
    }
  ]
}

class PromptModal extends React.Component<Props, State> {
  componentDidMount() {
    const listeners = getListeners(this)
    listeners.forEach(listener => document.addEventListener('keydown', listener))
    this.setState({ listeners })
  }
  componentWillUnmount() {
    const { listeners } = this.state
    listeners.forEach(listener => document.addEventListener('keydown', listener))
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
