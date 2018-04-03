import * as React from 'react'
import CardDisplay from './CardDisplay'
import { Folder } from 'service/folder-service'

type Props = {
  buttonAction: () => any
}

export default (props: Props) => {
  const { buttonAction } = props
  return (<CardDisplay
    header={'Add new'}
    buttonText='New folder'
    icon={{
      name: 'folder',
      color: 'blue'
    }}
    buttonAction={buttonAction} />
  )
}
