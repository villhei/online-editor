import { Action } from 'redux'
import { isType } from 'typescript-fsa'
import {
  createDocumentAction,
  getDocumentAction,
  getDocumentsAction,
  updateDocumentAction
} from 'actions/document-actions'
import { ApiResource, ResourceStatus } from 'service/common'
import { TextDocument } from 'service/document-service'

type DocumentMap = { [id: string]: ApiResource<TextDocument> }

export type DocumentReducerState = {
  byId: DocumentMap,
  all: Array<TextDocument>
}

export const initialState: DocumentReducerState = {
  byId: {},
  all: []
}

function updateOrJoin(array: Array<TextDocument>, object: TextDocument): Array<TextDocument> {
  const index = array.findIndex(({ id }) => object.id === id)
  if (index > -1) {
    const modified = Array.from(array)
    modified.splice(index, 1, object)
    return modified
  } else {
    return array.concat(object)
  }
}

function updateSingle(state: DocumentReducerState, document: TextDocument): DocumentReducerState {
  const byId = {
    ...state.byId,
    [document.id]: document
  }
  const all = updateOrJoin(state.all, document)
  return {
    ...state,
    byId,
    all
  }
}

export default function documentReducer(state: DocumentReducerState = initialState, action: Action): DocumentReducerState {
  if (isType(action, getDocumentsAction.done)) {
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
  if (isType(action, updateDocumentAction.done)) {
    return updateSingle(state, action.payload.result)
  }
  if (isType(action, getDocumentAction.done)) {
    return updateSingle(state, action.payload.result)
  }
  if (isType(action, createDocumentAction.done)) {
    return updateSingle(state, action.payload.result)
  }
  return state
}
