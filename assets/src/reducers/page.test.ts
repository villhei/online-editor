import { Action } from 'redux'
import actionCreatorFactory from 'typescript-fsa'
import { TOGGLE_MENU } from 'constants/page'
import { LOCATION_CHANGE } from 'react-router-redux'
import { ToggleMenu, toggleMenu, reset } from 'actions/page-actions'
import pageReducer, { initialState } from './page'

const actionFactory = actionCreatorFactory()

const toggleAction = toggleMenu({ menu: 'navigation' })

const navigationAction = {
  type: LOCATION_CHANGE
  payload: {}
}

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

  it('should hide the menu when navigation happens', () => {
    const state = { ...initialState, navigationOpen: true }
    expect(pageReducer(state, navigationAction).navigationOpen).toBeFalsy()
  })
})