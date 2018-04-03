import { Action } from 'redux'
import { isType } from 'typescript-fsa'
import {
  getRootAction, getChildrenAction, getFolderAction, selectFolder
} from 'actions/folder-actions'
import { ApiResource, ResourceStatus, MappedModel, updateSingle } from 'service/common'
import { Folder, FolderId } from 'service/folder-service'

type FolderMap = { [id: string]: ApiResource<Folder> }

export type NavigatorState = {
  current: FolderId
} & MappedModel<ApiResource<Folder>>

export const initialState: NavigatorState = {
  current: '',
  byId: {}
}

export default function navigatorReducer(state: NavigatorState = initialState, action: Action): NavigatorState {
  if (isType(action, selectFolder)) {
    return {
      ...state,
      current: action.payload.id
    }
  }
  if (isType(action, getRootAction.done)) {
    const { result } = action.payload
    return {
      ...updateSingle(state, result.id, result),
      current: result.id
    }
  }
  if (isType(action, getFolderAction.started)) {
    const { id } = action.payload
    return updateSingle(state, id, ResourceStatus.Loading)
  }
  if (isType(action, getFolderAction.failed)) {
    const { id } = action.payload.params
    const error = action.payload.error
    return updateSingle(state, id, error)
  }
  if (isType(action, getChildrenAction.done)) {
    const { result } = action.payload
    return result.reduce((acc, folder) => ({
      ...acc,
      ...updateSingle(acc, folder.id, folder)
    }), state)
  }
  if (isType(action, getFolderAction.done)) {
    const { result } = action.payload
    return updateSingle(state, result.id, result)
  }
  return state
}
