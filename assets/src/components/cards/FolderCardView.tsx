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
    icon={{
      name: 'folder',
      color: 'blue'
    }}
    buttonAction={selectFolder}>
    <>
      <div className='meta'>
        {folder.documents.length} documents
      </div>
      <div className='ui divider' />
    </>
  </CardDisplay>
  )
}
