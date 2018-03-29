import { Action } from 'redux'
import { isType } from 'typescript-fsa'
import {
  getRootAction
} from 'actions/folder-actions'
import { ApiResource, ResourceStatus } from 'service/common'
import { Folder, FolderId } from 'service/folder-service'

type FolderMap = { [id: string]: ApiResource<Folder> }

export type NavigatorState = {
  current: FolderId,
  folder: ApiResource<Folder>
  dictionary: FolderMap
}

export const initialState: NavigatorState = {
  current: 'Root',
  folder: ResourceStatus.Loading,
  dictionary: {}
}

export default function navigatorReducer(state: NavigatorState = initialState, action: Action): NavigatorState {
  if (isType(action, getRootAction.done)) {
    return {
      ...state,
      folder: action.payload.result
    }
  }
  return state
}