import { ResourceFetcher } from 'library/containers/common'
import { MappedModel, ResourceMap } from 'library/reducers/common'
import { ApiResourceId, SortableKeysOf } from 'library/service/common'
import { Dispatch } from 'redux'

export type StateMappedProps<T> = {
  resources: ResourceMap<T>
}

export function sortList<Folder>(
  resources: Array<Folder>,
  key: SortableKeysOf<Folder>,
  reverse: boolean): Array<Folder> {
  return Array.from(resources).sort((a: Folder, b: Folder) => {
    if (reverse) {
      return b[key].toString().localeCompare(a[key].toString())
    }
    return a[key].toString().localeCompare(b[key].toString())
  })
}

export function selectApiResources<T>(mappedModel: MappedModel<T>, resourceIds: Array<ApiResourceId>): StateMappedProps<T> {
  const resources: ResourceMap<T> = resourceIds.reduce((acc, id) => ({
    ...acc,
    [id]: mappedModel.byId[id]
  }), {})
  return {
    resources
  }
}

export type DispatchMappedProps = {
  getResource: (id: ApiResourceId) => void
}

export function mapGetResource<T>(dispatch: Dispatch, resourceFetcher: ResourceFetcher<T>) {
  return {
    getResource: (id: ApiResourceId) => resourceFetcher(dispatch, { id })
  }
}
