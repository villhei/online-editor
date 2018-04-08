import actionCreatorFactory from 'typescript-fsa'
import { bindThunkAction } from 'typescript-fsa-redux-thunk'
import { push } from 'react-router-redux'
import { getRootAction, getRootFolder } from 'actions/folder-actions'
import { Folder, getRoot } from 'service/folder-service'
const actionCreator = actionCreatorFactory()

export const TOGGLE_MENU = 'TOGGLE_MENU'

export const CLEAR_ERROR = 'CLEAR_ERROR'

export type ToggleMenu = {
  menu: string
}

export const toggleMenu = actionCreator<ToggleMenu>(TOGGLE_MENU)
export const clearError = actionCreator<undefined>(CLEAR_ERROR)
export const selectRootFolder = bindThunkAction(getRootAction, async (params, dispatch): Promise<Folder> => {
  const folder = await getRootFolder(dispatch, undefined)
  dispatch(push('/folder/' + folder.id))
  return folder
})
