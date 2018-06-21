import {
  deleteDocumentAction,
  getDocumentAction,
  updateDocumentAction
} from 'actions/document-actions'
import {
  setListOrdering,
  setSelectedItems
} from 'actions/page-actions'
import {
  HasId,
  Map
} from 'library/service/common'
import { Action } from 'redux'
import { SortableKeys } from 'service/common'
import { isType } from 'typescript-fsa'

export interface Ordering {
  orderBy: SortableKeys,
  reverse: boolean
}

export interface PageState {
  editorToolbar: {
    refreshing: boolean,
    saving: boolean,
    deleting: boolean
  },
  order: Ordering,
  selectedItems: Map<HasId>
}

export const initialState: PageState = {
  editorToolbar: {
    refreshing: false,
    saving: false,
    deleting: false
  },
  order: {
    orderBy: 'name',
    reverse: false
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
  if (isType(action, setListOrdering)) {
    return {
      ...state,
      order: action.payload
    }
  }
  return state
}
