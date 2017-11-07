import actionCreatorFactory from 'typescript-fsa'
import { TOGGLE_MENU }from 'constants/page'
const actionCreator = actionCreatorFactory()

export type ToggleMenu = {
  menu: string
}

export const toggleMenu = actionCreator<ToggleMenu>(TOGGLE_MENU)
