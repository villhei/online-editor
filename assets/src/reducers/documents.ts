import { Action } from 'redux'
import { isType } from 'typescript-fsa'
import {
  createDocumentAction,
  getDocumentAction,
  getDocumentsAction,
  updateDocumentAction,
  getDocumentsByFolderAction
} from 'actions/document-actions'

import { ApiResource, ResourceStatus, DocumentMap, updateSingle, MappedModel } from 'service/common'
import { TextDocument, TextDocumentId } from 'service/document-service'

export type DocumentReducerState = MappedModel<ApiResource<TextDocument>>

export const initialState: DocumentReducerState = {
  byId: {},
  all: []
}

export default function documentReducer(state: DocumentReducerState = initialState, action: Action): DocumentReducerState {
  if (isType(action, getDocumentsAction.done) || isType(action, getDocumentsByFolderAction.done)) {
    const documents = action.payload.result
    return {
      ...state,
      all: documents
    }
  }
  if (isType(action, getDocumentAction.started)) {
    const id = action.payload.id
    return {
      ...state,
      byId: {
        ...state.byId,
        [id]: ResourceStatus.Loading
      }
    }
  }
  if (isType(action, getDocumentAction.failed)) {
    const id = action.payload.params.id
    const error = action.payload.error
    return {
      ...state,
      byId: {
        ...state.byId,
        [id]: ResourceStatus.NotFound
      }
    }
  }
  if (isType(action, updateDocumentAction.done)
    || isType(action, getDocumentAction.done)
    || isType(action, createDocumentAction.done)) {
    const { result } = action.payload
    return updateSingle(state, result.id, result)
  }
  return state
}
