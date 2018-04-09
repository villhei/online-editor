import {
  getRootAction,
  getRootFolder
} from 'actions/folder-actions'
import { push } from 'react-router-redux'
import {
  Folder,
  getRoot
} from 'service/folder-service'
import actionCreatorFactory from 'typescript-fsa'
import { bindThunkAction } from 'typescript-fsa-redux-thunk'
const actionCreator = actionCreatorFactory()

export const TOGGLE_MENU = 'TOGGLE_MENU'

export const CLEAR_ERROR = 'CLEAR_ERROR'

export const SET_SELECTED_ITEMS = 'SET_SELECTED_ITEMS'

export type ToggleMenu = {
  menu: string
}

export type SelectedItems = {
  selection: {
    [id: string]: boolean
  }
}

export const toggleMenu = actionCreator<ToggleMenu>(TOGGLE_MENU)
export const clearError = actionCreator<undefined>(CLEAR_ERROR)
export const setSelectedItems = actionCreator<SelectedItems>(SET_SELECTED_ITEMS)

export const selectRootFolder = bindThunkAction(getRootAction, async (params, dispatch): Promise<Folder> => {
  const folder = await getRootFolder(dispatch, undefined)
  dispatch(push('/folder/' + folder.id))
  return folder
})
