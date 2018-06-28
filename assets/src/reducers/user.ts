import { getCurrentUserAction } from 'actions/page-actions'
import {
  ApiResource,
  ResourceStatus
} from 'library/service/common'
import { Action } from 'redux'
import { User } from 'service/user-service'
import { isType } from 'typescript-fsa'

export interface UserState {
  current: ApiResource<User> | undefined
}

export const initialState: UserState = {
  current: undefined
}

export default function userReducer(state: UserState = initialState, action: Action): UserState {
  if (isType(action, getCurrentUserAction.started)) {
    return {
      current: ResourceStatus.Loading
    }
  }
  if (isType(action, getCurrentUserAction.done)) {
    return {
      current: action.payload.result
    }
  }
  if (isType(action, getCurrentUserAction.failed)) {
    return {
      current: action.payload.error
    }
  }
  return state
}
