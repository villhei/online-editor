import * as React from 'react'

interface Props {
  children?: JSX.Element | string
}
const Modal = (props: Props) => {
  return (
    <div className='ui dimmer visible active'>
      <div className='ui mini basic modal transition visible active'>
        {props.children}
      </div>
    </div>
  )
}

export default Modal
