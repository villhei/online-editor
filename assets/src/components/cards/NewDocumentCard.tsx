import * as React from 'react'
import CardDisplay from './CardDisplay'
import { Folder } from 'service/folder-service'

type Props = {
  buttonAction: () => any
}

export default (props: Props) => {
  const { buttonAction } = props
  return (<CardDisplay
    header={'New document'}
    buttonText='New document'
    icon={{
      name: 'file',
      color: 'blue'
    }}
    buttonAction={buttonAction}>
  </CardDisplay>
  )
}
