import { updateDocumentAction } from 'actions/document-actions'
import {
  modifyDocument,
  resetDocumentChanges
} from 'actions/editor-actions'
import { LOCATION_CHANGE } from 'react-router-redux'
import { Action } from 'redux'
import { PartialTextDocument } from 'service/document-service'
import { isType } from 'typescript-fsa'

export type EditorState = {
  modifiedDocument: PartialTextDocument
  isModified: boolean
}

export const initialState: EditorState = {
  modifiedDocument: {},
  isModified: false
}

export default function editorReducer(state: EditorState = initialState, action: Action) {
  if (isType(action, modifyDocument)) {
    const { modifiedDocument } = state
    return {
      ...state,
      modifiedDocument: {
        ...modifiedDocument,
        ...action.payload.modifications
      },
      isModified: true
    }
  }
  if (isType(action, resetDocumentChanges) || isType(action, updateDocumentAction.done)) {
    return {
      ...state,
      modifiedDocument: {},
      isModified: false
    }
  }
  if (action.type === LOCATION_CHANGE) {
    return {
      ...state,
      modifiedDocument: {},
      isModified: false
    }
  }
  return state
}
