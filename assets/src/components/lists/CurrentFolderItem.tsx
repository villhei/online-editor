import * as classNames from 'classnames'
import * as React from 'react'

type Props = {
  name: string,
  disabled: boolean,
  onClick: () => void
}

export default (props: Props) => {
  const { name, disabled, onClick } = props
  const folderIcon = classNames({
    disabled: disabled
  }, 'circular inverted grey folder icon')
  return (<div className='item'>
    <div className='ui content grid'>
      <div className='ui row'>
        <div className='ui twelve wide column'>
          <a onClick={() => !disabled ? onClick() : null}>
            <i className='large icons'>
              <i className={folderIcon}></i>
              <i className='circular inverted top left corner ellipsis horizontal icon'></i>
            </i>
          </a>
          <b>
            {name}
          </b>
        </div>
      </div>
    </div>
  </div >)
}
