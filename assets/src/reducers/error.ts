import {
  createDocumentAction,
  getDocumentAction,
  getDocumentsAction,
  updateDocumentAction
} from 'actions/document-actions'
import {
  createFolderAction,
  getChildrenAction,
  getFolderAction,
  getRootAction,
  updateFolderAction
} from 'actions/folder-actions'
import { clearError } from 'actions/page-actions'
import { AxiosError } from 'axios'
import {
  Action,
  AsyncActionCreators,
  Failure,
  isType
} from 'typescript-fsa'

export type ErrorState = {
  message: string | undefined,
  stack: string | undefined
}

export const initialState: ErrorState = {
  message: undefined,
  stack: undefined
}

const RECORDED_API_ACTIONS = [
  createDocumentAction,
  getDocumentAction,
  getDocumentsAction,
  updateDocumentAction,
  createFolderAction,
  getChildrenAction,
  getFolderAction,
  getRootAction,
  updateFolderAction
]

function updateError(state: ErrorState, error: Error): ErrorState {
  return {
    ...state,
    message: error.message ? error.message : undefined,
    stack: error.stack ? error.stack : undefined
  }
}
// tslint:disable-next-line
function isFailureIn(action: Action<any>, actions: AsyncActionCreators<any, any, AxiosError>[]): action is Action<Failure<any, AxiosError>> {
  return actions.find(creator => isType(action, creator.failed)) !== undefined
}

export default function errorReducer<T>(state: ErrorState = initialState, action: Action<T>): ErrorState {
  if (isFailureIn(action, RECORDED_API_ACTIONS)) {
    const error = action.payload.error
    return updateError(state, error)
  }
  if (isType(action, clearError)) {
    return initialState
  }
  return state
}
