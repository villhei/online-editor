import { HasId } from 'library/service/common'
import * as React from 'react'

type OwnProps<T> = {
  resource: HasId,
  disabled?: boolean,
  onSelect?: (resource: T) => void,
  onClick: (resource: T) => void
}

export type ListItemProps<T> = OwnProps<T> & {
  resource: T
}

export default class ListItem<T, Props> extends React.Component<ListItemProps<T> & Props> {
  handleOnClick = () => {
    const { onClick, resource, disabled } = this.props
    if (!disabled) {
      onClick(resource)
    }
  }

  handleOnSelect = () => {
    const { onSelect, resource, disabled } = this.props
    if (typeof onSelect === 'function' && disabled === false) {
      onSelect(resource)
    }
  }
}
