import * as React from 'react'

interface Props {
  name: string,
  disabled: boolean,
  onClick: () => void
}

type IconProps = {
  disabled: boolean
}

const FolderIcon = (props: IconProps): JSX.Element => {
  if (props.disabled) {
    return <i className='large disabled circular inverted grey home icon' />
  } else {
    return (<i className='large icons'>
      <i className='circular inverted grey folder icon'></i>
      <i className='circular inverted top left corner ellipsis horizontal icon'></i>
    </i>)
  }
}
export default (props: Props) => {
  const { name, disabled, onClick } = props
  return (<div className='item'>
    <div className='ui content grid'>
      <div className='ui row'>
        <div className='ui twelve wide column'>
          <a onClick={() => !disabled ? onClick() : null}>
            <FolderIcon disabled={disabled} />
          </a>
          <b>
            {name}
          </b>
        </div>
      </div>
    </div>
  </div >)
}
