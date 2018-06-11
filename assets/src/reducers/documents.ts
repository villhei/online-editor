import {
  createDocumentAction,
  deleteDocumentAction,
  deleteDocumentsAction,
  getDocumentAction,
  getDocumentsAction,
  getDocumentsByFolderAction,
  updateDocumentAction
} from 'actions/document-actions'
import {
  ApiResource,
  ResourceStatus
} from 'library/service/common'
import { Action } from 'redux'
import { TextDocument } from 'service/document-service'
import { isType } from 'typescript-fsa'

import {
  MappedModel,
  removeMany,
  removeSingle,
  updateMany,
  updateSingle
} from 'library/reducers/common'

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
  if (isType(action, deleteDocumentAction.done)) {
    return removeSingle(state, action.payload.result)
  }
  if (isType(action, deleteDocumentsAction.done)) {
    return removeMany(state, action.payload.result)
  }
  if (isType(action, updateDocumentAction.done)
    || isType(action, getDocumentAction.done)
    || isType(action, createDocumentAction.done)) {
    const { result } = action.payload
    return updateSingle(state, result.id, result)
  }
  return state
}
