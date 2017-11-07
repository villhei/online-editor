import { Action } from 'redux'
import actionCreatorFactory from 'typescript-fsa'
import { TOGGLE_MENU } from 'constants/page'
import { ToggleMenu, toggleMenu } from 'actions/page-actions'
import pageReducer, { initialState } from './page'

const actionFactory = actionCreatorFactory()

const toggleAction = toggleMenu({ menu: 'navigation' })

describe('Page reducer', () => {
  it('should return the state as-is if action is not recognized', () => {
    expect(pageReducer(initialState, {
      type: 'NOP'
    })).toEqual(initialState)
  })

  it('should show the menu', () => {
    expect(pageReducer(initialState, toggleAction).navigationOpen).toBeTruthy()
  })

  it('should hide the menu', () => {
    const state = { ...initialState, navigationOpen: true }
    expect(pageReducer(state, toggleAction).navigationOpen).toBeFalsy()
  })
})