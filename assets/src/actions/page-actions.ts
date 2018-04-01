import actionCreatorFactory from 'typescript-fsa'

const actionCreator = actionCreatorFactory()

export const TOGGLE_MENU = 'TOGGLE_MENU'

export const CLEAR_ERROR = 'CLEAR_ERROR'

export type ToggleMenu = {
  menu: string
}

export const toggleMenu = actionCreator<ToggleMenu>(TOGGLE_MENU)
export const clearError = actionCreator<undefined>(CLEAR_ERROR)
