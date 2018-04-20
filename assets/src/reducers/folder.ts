import {
  deleteFolderaction,
  deleteFoldersAction,
  getChildrenAction,
  getFolderAction
} from 'actions/folder-actions'
import { Action } from 'redux'
import {
  ApiResource,
  ResourceStatus
} from 'service/common'
import {
  Folder
} from 'service/folder-service'
import { isType } from 'typescript-fsa'

import {
  MappedModel,
  removeMany,
  removeSingle,
  updateMany,
  updateSingle
} from './common'

export type FolderState = MappedModel<ApiResource<Folder>>

export const initialState: FolderState = {
  byId: {}
}

export default function folderReducer(state: FolderState = initialState, action: Action): FolderState {
  if (isType(action, getFolderAction.started)) {
    const { id } = action.payload
    return updateSingle<Folder, FolderState>(state, id, ResourceStatus.Loading)
  }
  if (isType(action, getFolderAction.failed)) {
    const id = action.payload.params.id
    const error = action.payload.error
    return updateSingle(state, id, error as Error)
  }
  if (isType(action, getChildrenAction.done)) {
    const { result } = action.payload
    return updateMany(state, result)
  }
  if (isType(action, deleteFolderaction.done)) {
    return removeSingle(state, action.payload.params.resource.id)
  }
  if (isType(action, deleteFoldersAction.done)) {
    return removeMany(state, action.payload.result)
  }
  if (isType(action, getFolderAction.done)) {
    const { result } = action.payload
    return updateSingle(state, result.id, result)
  }
  return state
}
