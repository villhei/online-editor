import { ApiResourceDispatch, ResourceFetcher, mapGetResource, selectApiResource } from 'containers/ApiResourceHOC'
import { RootState } from 'main/reducer'
import * as React from 'react'
import { Dispatch } from 'react-redux'
import { ApiResource, ApiResourceId, HasId } from 'service/common'

type OwnProps = {
  resource: HasId,
  onSelect: (resource: HasId) => void,
  onClick: (resource: HasId) => void
}

export type ListItemProps<T> = OwnProps & {
  resource: T
}

type MappedProps<T> = {
  resourceId: ApiResourceId,
  resource: ApiResource<T>
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

type HasResourceId = {
  resourceId: ApiResourceId
}

export function createResourceMapper<T, P>(stateKey: 'folders' | 'documents') {
  return (state: RootState, ownProps: P & HasResourceId): MappedProps<T> & P & HasResourceId => {
    const { resourceId } = ownProps
    return Object.assign({},
      selectApiResource<T>(state, stateKey, resourceId),
      ownProps)
  }
}

export type ApiResourceDispatcher = (dispatch: Dispatch<RootState>) => ApiResourceDispatch

export function createDispatchMapper(getResource: ResourceFetcher): ApiResourceDispatcher {
  return (dispatch: Dispatch<RootState>): ApiResourceDispatch => mapGetResource(dispatch, getResource)
}
