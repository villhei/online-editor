import { Action } from 'redux'
import { isType } from 'typescript-fsa'
import {
  createDocumentAction,
  getDocumentAction,
  getDocumentsAction,
  updateDocumentAction,
  getDocumentsByFolderAction
} from 'actions/document-actions'

import { ApiResource, ResourceStatus } from 'service/common'
import { updateSingle, updateMany, MappedModel } from './common'
import { TextDocument } from 'service/document-service'

export type DocumentReducerState = MappedModel<ApiResource<TextDocument>>

export const initialState: DocumentReducerState = {
  byId: {}
}

export default function documentReducer(state: DocumentReducerState = initialState, action: Action): DocumentReducerState {
  if (isType(action, getDocumentsAction.done) || isType(action, getDocumentsByFolderAction.done)) {
    const documents = action.payload.result
    return updateMany(state, documents)
  }
  if (isType(action, getDocumentAction.started)) {
    const id = action.payload.id
    return updateSingle(state, id, ResourceStatus.Loading)
  }
  if (isType(action, getDocumentAction.failed)) {
    const id = action.payload.params.id
    const error = action.payload.error
    return updateSingle(state, id, error as Error)
  }
  if (isType(action, updateDocumentAction.done)
    || isType(action, getDocumentAction.done)
    || isType(action, createDocumentAction.done)) {
    const { result } = action.payload
    return updateSingle(state, result.id, result)
  }
  return state
}
