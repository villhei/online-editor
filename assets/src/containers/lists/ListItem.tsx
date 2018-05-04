import * as React from 'react'
import { HasId } from 'service/common'

type OwnProps = {
  resource: HasId,
  onSelect: (resource: HasId) => void,
  onClick: (resource: HasId) => void
}

export type ListItemProps<T> = OwnProps & {
  resource: T
}

export default class ListItem<T, Props> extends React.Component<ListItemProps<T> & Props> {
  handleOnClick = () => {
    const { onClick, resource } = this.props
    onClick(resource)
  }

  handleOnSelect = () => {
    const { onSelect, resource } = this.props
    onSelect(resource)
  }
}
