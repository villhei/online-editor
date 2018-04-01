import { Action } from 'redux'
import { isType } from 'typescript-fsa'
import {
  getRootAction, getChildrenAction
} from 'actions/folder-actions'
import { ApiResource, ResourceStatus, MappedModel, updateSingle } from 'service/common'
import { Folder, FolderId } from 'service/folder-service'

type FolderMap = { [id: string]: ApiResource<Folder> }

export type NavigatorState = {
  current: FolderId
} & MappedModel<ApiResource<Folder>>

export const initialState: NavigatorState = {
  current: '',
  byId: {},
  all: []
}

export default function navigatorReducer(state: NavigatorState = initialState, action: Action): NavigatorState {
  if (isType(action, getRootAction.done)) {
    const { result } = action.payload
    return {
      ...state,
      ...updateSingle(state, result.id, result),
      current: result.id
    }
  }
  if (isType(action, getChildrenAction.done)) {
    const { result } = action.payload
    return result.reduce((acc, folder) => ({
      ...acc,
      ...updateSingle(acc, folder.id, folder)
    }), state)
  }
  return state
}
