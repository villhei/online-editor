import axios, { AxiosError } from 'axios'

export enum ResourceStatus {
  Loading = 'API_RESOURCE:LOADING',
  NotFound = 'API_RESOURCE:NOT_FOUND'
}

export type HasName = {
  name: string
}

export type HasId = {
  id: string
}
export type ApiResource<T> = T | ResourceStatus | Error

export function getResourceName(resource: ApiResource<HasName>, modifiedName?: string): string {
  if (resource === ResourceStatus.Loading) {
    return 'Loading...'
  } else if (resource === ResourceStatus.NotFound) {
    return 'Not found'
  } else if (resource && resource.name) {
    return modifiedName || resource.name
  } else {
    return 'Error'
  }
}

export function isResourceAvailable(resource: ApiResource<HasId>): boolean {
  if (resource === ResourceStatus.Loading) {
    return false
  } else if (resource === ResourceStatus.NotFound) {
    return false
  } else if (resource instanceof Error) {
    return false
  } else if (resource && resource.id) {
    return true
  }
  return false
}
export function isAxiosError(err: any): err is AxiosError {
  const candidate = (err as AxiosError)
  return Boolean(candidate.message && candidate.name && candidate.config)
}
