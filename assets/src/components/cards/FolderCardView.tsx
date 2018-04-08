import * as React from 'react'
import { Folder } from 'service/folder-service'

import CardDisplay from './CardDisplay'
import SelectedButton from './SelectedButton'

type Props = {
  folder: Folder,
  selected: boolean
  showFolder: () => any,
  selectFolder: (event: React.MouseEvent<HTMLElement>) => void
}

export default (props: Props) => {
  const { folder, selected, showFolder, selectFolder } = props
  return (<CardDisplay
    header={folder.name}
    selected={selected}
    icon={{
      name: 'folder',
      color: 'blue'
    }}
    buttonAction={showFolder}>
    <>
      <div className='meta'>
        {folder.documents.length} documents
      </div>
      <div className='ui divider' />
      <SelectedButton
        selected={selected}
        onSelect={selectFolder} />
    </>
  </CardDisplay>
  )
}
