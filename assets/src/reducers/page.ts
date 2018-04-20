import {
  deleteDocumentAction,
  getDocumentAction,
  updateDocumentAction
} from 'actions/document-actions'
import {
  setSelectedItems
} from 'actions/page-actions'
import { Action } from 'redux'
import {
  HasId,
  Map
} from 'service/common'
import { isType } from 'typescript-fsa'

export type PageState = {
  editorToolbar: {
    refreshing: boolean,
    saving: boolean,
    deleting: boolean
  },
  selectedItems: Map<HasId>
}

export const initialState: PageState = {
  editorToolbar: {
    refreshing: false,
    saving: false,
    deleting: false
  },
  selectedItems: {}
}

function updateToolbarItem(state: PageState, itemName: string, newStatus: boolean): PageState {
  const editorToolbar = {
    ...state.editorToolbar,
    [itemName]: newStatus
  }
  return {
    ...state,
    editorToolbar
  }
}

export default function pageReducer(state: PageState = initialState, action: Action): PageState {
  if (isType(action, setSelectedItems)) {
    return {
      ...state,
      selectedItems: action.payload.selection
    }
  }
  if (isType(action, deleteDocumentAction.started)) {
    return updateToolbarItem(state, 'deleting', true)
  }
  if (isType(action, deleteDocumentAction.done) || isType(action, deleteDocumentAction.failed)) {
    return updateToolbarItem(state, 'deleting', false)
  }
  if (isType(action, getDocumentAction.started)) {
    return updateToolbarItem(state, 'refreshing', true)
  }
  if (isType(action, getDocumentAction.done) || isType(action, getDocumentAction.failed)) {
    return updateToolbarItem(state, 'refreshing', false)
  }
  if (isType(action, updateDocumentAction.started)) {
    return updateToolbarItem(state, 'saving', true)
  }
  if (isType(action, updateDocumentAction.done) || isType(action, updateDocumentAction.failed)) {
    return updateToolbarItem(state, 'saving', false)
  }
  return state
}
