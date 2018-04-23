import axios, { AxiosError } from 'axios'

export enum ResourceStatus {
  Loading = 'API_RESOURCE:LOADING',
  NotFound = 'API_RESOURCE:NOT_FOUND'
}

export type ApiResourceId = string

export type ByIdParams = {
  id: ApiResourceId
}

export type HasName = {
  name: string
}

export type HasId = {
  id: string
}

export type ByResourceParams<T> = { resource: T }

export type Map<T> = {
  [id: string]: T
}

export type Partial<T> = {
  [Partial in keyof T]?: T[Partial]
}

export type ApiResource<T> = T | ResourceStatus | Error

export function getResourceName(resource: ApiResource<HasName>): string {
  if (resource === ResourceStatus.Loading) {
    return 'Loading...'
  } else if (resource === ResourceStatus.NotFound) {
    return 'Not found'
  } else if (resource && resource.name) {
    return resource.name
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

export function isAxiosError(candidate: any): candidate is AxiosError {
  return Boolean(candidate && candidate.config && candidate.message && candidate.name)
}

export type RequestOptions = {
  query?: {
    [param: string]: string
  }
}

const requestDefaults: RequestOptions = {
  query: {}
}

export type ApiEndpoints<T extends HasId> = {
  create: (resource: Partial<T>) => Promise<T>,
  getAll: (options?: RequestOptions) => Promise<Array<T>>,
  getById: (id: ApiResourceId) => Promise<T>,
  update: (id: ApiResourceId, updatedResource: Partial<T>, options?: RequestOptions) => Promise<T>,
  deleteResource: (resource: T) => Promise<ApiResourceId>
}

function getQueryString(options: RequestOptions): string {
  if (!options.query) {
    return ''
  }
  const queryString = Object.entries(options.query)
    .map(option => option.join('='))
    .join('&')

  return '?' + queryString
}

export function configureApiEndpoints<T extends HasId>(apiPath: string): ApiEndpoints<T> {
  function create(resource: Partial<T>, options: RequestOptions = requestDefaults): Promise<T> {
    const query = getQueryString(options)
    return axios.post<Promise<T>>(apiPath + query, resource)
      .then(response => response.data)
  }

  function getAll(options: RequestOptions = requestDefaults): Promise<Array<T>> {
    const query = getQueryString(options)
    return axios.get<Array<T>>(apiPath + query).then(res => res.data)
  }

  function getById(id: ApiResourceId): Promise<T> {
    return axios.get<T>(`${apiPath}/${id}`).then(res => res.data)
  }

  function update(
    id: ApiResourceId,
    updatedResource: T,
    options: RequestOptions = requestDefaults): Promise<T> {
    const query = getQueryString(options)
    return axios.put<T>(`${apiPath}/${id}` + query, updatedResource)
      .then(res => res.data)
  }

  function deleteResource(resource: T, options: RequestOptions = requestDefaults): Promise<ApiResourceId> {
    const query = getQueryString(options)
    return axios.delete(`${apiPath}/${resource.id}` + query).then(() => resource.id)
  }

  return {
    create,
    getAll,
    getById,
    update,
    deleteResource
  }
}
