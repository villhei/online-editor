import * as React from 'react'
import CardDisplay from './CardDisplay'
import { Folder } from 'service/folder-service'

type Props = {
  folder: Folder
}

export default (props: Props) => {
  const { folder } = props
  return (<CardDisplay
    disabled={true}
    header={folder.name}
    icon={{
      name: 'folder',
      color: 'blue'
    }}
    buttonAction={() => null}>
    <div className='meta'>
      <p>{folder.children.length} folders</p>
      <p>{folder.documents.length} documents</p>
    </div>
  </CardDisplay>
  )
}
