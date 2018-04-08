import {
  ApiResource,
  HasId
} from 'service/common'

export type DocumentMap<T> = { [id: string]: ApiResource<T> }
export type MappedModel<T> = {
  byId: DocumentMap<T>
}

export function updateSingle<T extends HasId, S extends Object>(
  state: S & MappedModel<ApiResource<T>>,
  id: string,
  updatedEntity: ApiResource<T>
): S & MappedModel<ApiResource<T>> {
  const byId = {
    ...state.byId,
    [id]: updatedEntity
  }
  return Object.assign({}, state, { byId })
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
