import * as React from 'react'
import { Folder, FolderId } from 'service/folder-service'

type Props = {
  resourceId: FolderId,
  resource: Folder,
  selected: boolean
}

export default (props: Props) => {
  const { resource } = props
  return (
    < div className='item' >
      <div className='ui content grid'>
        <div className='ui row'>
          <div className='ui twelve wide column'>
            <i className='circular inverted large blue folder icon'></i>
            <a>{resource.name}</a>
          </div>
          <div className='ui two wide column'>
            <div className='ui basic blue icon button'>
              <i className='check icon' />
            </div>
          </div>
        </div>
      </div>
    </div >)
}
