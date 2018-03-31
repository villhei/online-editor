import actionCreatorFactory from 'typescript-fsa'

const actionCreator = actionCreatorFactory()

export const TOGGLE_MENU = 'TOGGLE_MENU'
export const SET_MODAL_VISIBILITY = 'SET_MODAL_VISIBILITY'
export const MODAL_CONFIRM = 'MODAL_CONFIRM'
export const MODAL_CLEAR = 'MODAL_CLEAR'

export const CLEAR_ERROR = 'CLEAR_ERROR'

export type ToggleMenu = {
  menu: string
}

export type SetModalVisibility = {
  visible: boolean,
  icon: string,
  title: string,
  message: string
}

export const toggleMenu = actionCreator<ToggleMenu>(TOGGLE_MENU)
export const setModalVisibility = actionCreator<SetModalVisibility>(SET_MODAL_VISIBILITY)
export const clearError = actionCreator<undefined>(CLEAR_ERROR)
export const modalConfirm = actionCreator<undefined>(MODAL_CONFIRM)
export const modalClear = actionCreator<undefined>(MODAL_CLEAR)
