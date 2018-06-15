
import { ResourceMap } from 'library/reducers/common'
import { ApiResource, ApiResourceId, ByIdParams, ResourceStatus, isAxiosError } from 'library/service/common'
import { Dispatch } from 'redux'
export type TypeChecker<T> = (value: ApiResource<T>) => value is T

export enum Status {
  LOADED,
  LOADING,
  ERROR,
  NOT_FOUND,
  NOT_LOADED
}

export function getResourceStatus<T>(resource: ApiResource<T> | undefined,
  isValueResolved: TypeChecker<T>): Status {
  if (isAxiosError(resource)) {
    return Status.ERROR
  }
  if (isValueResolved(resource)) {
    return Status.LOADED
  }
  if (resource === ResourceStatus.Loading) {
    return Status.LOADING
  }
  if (resource === ResourceStatus.NotFound) {
    return Status.NOT_FOUND
  }
  return Status.NOT_LOADED
}

export type StatusFlagged<T> = {
  status: Status,
  id: ApiResourceId,
  resource: ApiResource<T>
}

export function getResourceStatuses<T>(resources: ResourceMap<T>, isValueResolved: TypeChecker<T>): StatusFlagged<T>[] {
  return Object.entries(resources).map(([id, resource]) => ({
    id,
    status: getResourceStatus(resource, isValueResolved),
    resource
  }))
}

export type ResourceFetcher<T> = (dispatch: Dispatch, params: ByIdParams) => Promise<T>

export type ApiResourceDispatch = {
  getResource: (id: ApiResourceId) => void
}

export function mapGetResource<T>(dispatch: Dispatch, getResource: ResourceFetcher<T>): ApiResourceDispatch {
  return {
    getResource: (id: ApiResourceId) => getResource(dispatch, { id })
  }
}
