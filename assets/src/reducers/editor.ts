import { Action } from 'redux'
import { isType } from 'typescript-fsa'
import { updatedocumentContent } from 'actions/editor-actions'

export type EditorState = {
  modifiedContent: string
}

export const initialState: EditorState = {
  modifiedContent: ''
}

export default function editorReducer(state: EditorState = initialState, action: Action) {
  if(isType(action, updatedocumentContent)) {
    return {
      ...state,
      modifiedContent: action.payload.value
    }
  }
  return state
}