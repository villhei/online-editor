import * as classNames from 'classnames'
import * as React from 'react'

type MenuButtonProps = {
  loading: boolean,
  disabled: boolean,
  icon: string,
  align?: 'left' | 'right',
  onClick: () => void
}

const MenuButton = ({ loading, disabled, onClick, icon, align }: MenuButtonProps) => {
  const itemClasses = classNames('ui button', {
    'right aligned': align === 'right',
    'left aligned': align === 'left'
  }, 'item')
  const iconClasses = classNames({
    'spinner': loading,
    [icon]: !loading
  }, 'icon', {
    'loading': loading,
    'disabled': disabled
  })

  return (<div className={itemClasses} onClick={onClick}>
      <i className={iconClasses} />
  </div>)
}

export default MenuButton
