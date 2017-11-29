export enum ResourceStatus {
  Loading = 'API_RESOURCE:LOADING',
  NotFound = 'API_RESOURCE:NOT_FOUND'
}

export type ApiResource<T> = T | ResourceStatus | Error
