import * as React from 'react'
import * as classNames from 'classnames'

type MenuButtonProps = {
  loading: boolean,
  disabled: boolean,
  icon: string,
  onClick: () => void
}

const MenuButton = ({ loading, disabled, onClick, icon }: MenuButtonProps) => {
  const classes = classNames('ui basic icon button', {
    'loading': loading,
    'disabled': disabled
  })
  return (<div className={'ui item'}>
    <div className={classes} onClick={onClick}>
      <i className={'icon ' + icon} />
    </div>
  </div>)
}

export default MenuButton
