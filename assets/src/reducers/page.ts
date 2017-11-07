import { Action } from 'redux'
import { isType } from 'typescript-fsa'
import { toggleMenu } from 'actions/page-actions'
export type PageState = {
  navigationOpen: boolean
}

export const initialState: PageState = {
  navigationOpen: false
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
  return state
}