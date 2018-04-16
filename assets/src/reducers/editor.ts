import { updateDocumentAction } from 'actions/document-actions'
import {
  resetDocumentChanges,
  updateDocumentName,
  updatedocumentContent
} from 'actions/editor-actions'
import { LOCATION_CHANGE } from 'react-router-redux'
import { Action } from 'redux'
import { isType } from 'typescript-fsa'

export type EditorState = {
  modifiedContent?: string,
  modifiedName?: string
}

export const initialState: EditorState = {
  modifiedContent: undefined,
  modifiedName: undefined
}

export default function editorReducer(state: EditorState = initialState, action: Action) {
  if (isType(action, updatedocumentContent)) {
    return {
      ...state,
      modifiedContent: action.payload.value
    }
  }
  if (isType(action, updateDocumentName)) {
    return {
      ...state,
      modifiedName: action.payload.value
    }
  }
  if (isType(action, resetDocumentChanges) || isType(action, updateDocumentAction.done)) {
    return {
      ...state,
      modifiedContent: undefined,
      modifiedName: undefined
    }
  }
  if (action.type === LOCATION_CHANGE) {
    return {
      ...state,
      renaming: false
    }
  }
  return state
}
