import { ApiResourceDispatch, ResourceFetcher, mapGetResource, selectApiResource } from 'library/containers/ApiResourceHOC'
import { MappedModel } from 'library/reducers/common'
import { ApiResource, ApiResourceId, HasId } from 'library/service/common'
import { RootState } from 'main/store'
import * as React from 'react'
import { Dispatch } from 'react-redux'

type OwnProps<T> = {
  resource: HasId,
  disabled?: boolean,
  onSelect?: (resource: T) => void,
  onClick: (resource: T) => void
}

export type ListItemProps<T> = OwnProps<T> & {
  resource: T
}

type MappedProps<T> = {
  resourceId: ApiResourceId,
  resource: ApiResource<T>
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

type HasResourceId = {
  resourceId: ApiResourceId
}

type Selector<T> = (state: RootState) => MappedModel<T>

export function createResourceMapper<T, P>(selector: Selector<T>) {
  return (state: RootState, ownProps: P & HasResourceId): MappedProps<T> & P & HasResourceId => {
    const { resourceId } = ownProps
    return Object.assign({},
      selectApiResource<T>(selector(state), resourceId),
      ownProps)
  }
}

export type ApiResourceDispatcher = (dispatch: Dispatch) => ApiResourceDispatch

export function createDispatchMapper<T>(getResource: ResourceFetcher<T>): ApiResourceDispatcher {
  return (dispatch: Dispatch): ApiResourceDispatch => mapGetResource(dispatch, getResource)
}
