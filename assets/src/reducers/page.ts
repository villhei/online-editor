import { Action } from 'redux'
import { isType } from 'typescript-fsa'
import { LOCATION_CHANGE } from 'react-router-redux'
import { getDocumentAction, updateDocumentAction, deleteDocumentAction } from 'actions/document-actions'
import { toggleMenu } from 'actions/page-actions'

export type PageState = {
  navigationOpen: boolean,
  editorToolbar: {
    refreshing: boolean,
    saving: boolean,
    deleting: boolean
  }
}

export const initialState: PageState = {
  navigationOpen: false,
  editorToolbar: {
    refreshing: false,
    saving: false,
    deleting: false
  }
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
  if (isType(action, toggleMenu)) {
    if (action.payload.menu === 'navigation') {
      return {
        ...state,
        navigationOpen: !state.navigationOpen
      }
    }
  }
  if (action.type === LOCATION_CHANGE) {
    return {
      ...state,
      navigationOpen: false
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