import {
  ApiResource,
  ApiResourceId,
  HasId,
  ResourceStatus,
  isAxiosError
} from 'library/service/common'

export type ResourceMap<T> = { [id: string]: ApiResource<T> | undefined }

export type MappedModel<T> = {
  byId: ResourceMap<T>
}

function transformAxiosError<T>(maybeError: ApiResource<T>): ApiResource<T> {
  if (isAxiosError(maybeError) && maybeError.response && maybeError.response.status === 404) {
    return ResourceStatus.NotFound
  }
  return maybeError
}
export function updateSingle<T extends HasId, S extends Object>(
  state: S & MappedModel<ApiResource<T>>,
  id: string,
  updatedEntity: ApiResource<T>
): S & MappedModel<ApiResource<T>> {
  const byId = {
    ...state.byId,
    [id]: transformAxiosError(updatedEntity)
  }
  return Object.assign({}, state, { byId })
}

export function removeSingle<T extends HasId, S extends Object>(
  state: S & MappedModel<ApiResource<T>>,
  id: string
) {
  const {
    [id]: removedItem,
    ...byId
  } = state.byId
  const newState = Object.assign({}, state, { byId })
  return newState
}

export function updateMany<T extends HasId, S extends Object>(
  state: S & MappedModel<ApiResource<T>>,
  entities: Array<T>
): S & MappedModel<ApiResource<T>> {
  return entities.reduce((acc, entity) => {
    const updated = updateSingle(state, entity.id, entity)
    return Object.assign({}, acc, updated)
  }, state)
}

export function removeMany<T extends HasId, S extends Object>(
  state: S & MappedModel<ApiResource<T>>,
  entities: Array<ApiResourceId>
): S & MappedModel<ApiResource<T>> {
  return entities.reduce((acc, entity) => {
    const updated = removeSingle(state, entity)
    return Object.assign({}, acc, updated)
  }, state)
}
