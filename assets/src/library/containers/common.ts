
import { ResourceMap } from 'library/reducers/common'
import { ApiResource, ApiResourceId, ResourceStatus, isAxiosError } from 'library/service/common'
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
