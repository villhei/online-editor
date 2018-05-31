import { updateDocumentAction } from 'actions/document-actions'
import {
  resetDocumentChanges,
  updateDocumentName,
  updatedocumentContent
} from 'actions/editor-actions'
import { LOCATION_CHANGE } from 'react-router-redux'
import { Action } from 'redux'
import { PartialTextDocument } from 'service/document-service'
import { isType } from 'typescript-fsa'

export type EditorState = {
  modifiedDocument: null | PartialTextDocument
  isModified: boolean
}

export const initialState: EditorState = {
  modifiedDocument: null,
  isModified: false
}

export default function editorReducer(state: EditorState = initialState, action: Action) {
  if (isType(action, updatedocumentContent)) {
    const { modifiedDocument } = state
    return {
      ...state,
      modifiedDocument: {
        ...modifiedDocument,
        content: action.payload.value
      },
      isModified: true
    }
  }
  if (isType(action, updateDocumentName)) {
    const { modifiedDocument } = state
    return {
      ...state,
      modifiedDocument: {
        ...modifiedDocument,
        name: action.payload.value
      },
      isModified: true
    }
  }
  if (isType(action, resetDocumentChanges) || isType(action, updateDocumentAction.done)) {
    return {
      ...state,
      modifiedDocument: null,
      isModified: false
    }
  }
  if (action.type === LOCATION_CHANGE) {
    return {
      ...state,
      modifiedDocument: null,
      isModified: false
    }
  }
  return state
}
