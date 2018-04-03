import * as React from 'react'
import CardDisplay from './CardDisplay'
import { Folder } from 'service/folder-service'

type Props = {
  folder: Folder,
  selectFolder: () => any
}

export default (props: Props) => {
  const { folder, selectFolder } = props
  return (<CardDisplay
    header={folder.name}
    buttonText='select'
    icon={{
      name: 'folder',
      color: 'blue'
    }}
    buttonAction={selectFolder} />
  )
}
