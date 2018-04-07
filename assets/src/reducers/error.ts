import { Action } from 'redux'
import { isType } from 'typescript-fsa'
import { clearError } from 'actions/page-actions'
import { updateDocumentAction } from 'actions/document-actions'
import { getRootAction } from 'actions/folder-actions'

export type ErrorState = {
  message: string | undefined,
  stack: string | undefined
}

export const initialState: ErrorState = {
  message: undefined,
  stack: undefined
}

function updateError(state: ErrorState, error: any): ErrorState {
  return {
    ...state,
    message: (error as Error).message ? (error as Error).message : undefined,
    stack: (error as Error).stack ? (error as Error).stack : undefined
  }
}

export default function errorReducer(state: ErrorState = initialState, action: Action): ErrorState {
  if (isType(action, updateDocumentAction.failed)) {
    const error = action.payload.error
    return updateError(state, error)
  }
  if (isType(action, getRootAction.failed)) {
    const error = action.payload.error
    return updateError(state, error)
  }
  if (isType(action, clearError)) {
    return initialState
  }
  return state
}
