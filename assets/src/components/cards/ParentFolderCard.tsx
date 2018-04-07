import * as React from 'react'
import CardDisplay from './CardDisplay'

type Props = {
  disabled: boolean,
  buttonAction: () => any
}

export default (props: Props) => {
  const { buttonAction, disabled } = props
  return (<CardDisplay
    disabled={disabled}
    header={'Parent folder'}
    icon={{
      name: 'ellipsis horizontal',
      color: 'blue'
    }}
    buttonAction={buttonAction} />
  )
}
