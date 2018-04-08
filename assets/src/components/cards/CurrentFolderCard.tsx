import * as React from 'react'
import CardDisplay from './CardDisplay'
import { Folder } from 'service/folder-service'

type Props = {
  folder: Folder,
  disabled: boolean,
  buttonAction: () => any
}

export default (props: Props) => {
  const { folder, buttonAction, disabled } = props
  return (<CardDisplay
    disabled={true}
    header={folder.name}
    icon={{
      name: 'folder',
      color: 'blue'
    }}
    buttonAction={() => null}>
    <>
      <div className='meta'>
        {folder.children.length} folders<br />
        {folder.documents.length} documents
      </div>
      <button className='ui right floated basic button'
        disabled={disabled}
        onClick={buttonAction}>
        <i className='ui right floated huge ellipsis horizontal icon'></i>
      </button>
    </>
  </CardDisplay>
  )
}
