import { Action } from 'redux'
import { isType } from 'typescript-fsa'
import { updatedocumentContent, resetDocumentChanges } from 'actions/editor-actions'

export type EditorState = {
  modifiedContent: string | null
}

export const initialState: EditorState = {
  modifiedContent: null
}

export default function editorReducer(state: EditorState = initialState, action: Action) {
  if(isType(action, updatedocumentContent)) {
    return {
      ...state,
      modifiedContent: action.payload.value
    }
  }
  if(isType(action, resetDocumentChanges)) {
    return initialState
  }
  return state
}