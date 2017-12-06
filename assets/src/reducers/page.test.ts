import { Action } from 'redux'
import actionCreatorFactory from 'typescript-fsa'
import { TOGGLE_MENU } from 'constants/page'
import { LOCATION_CHANGE } from 'react-router-redux'
import { ACTION_DELETE_DOCUMENT, ACTION_UPDATE_DOCUMENT, ACTION_GET_DOCUMENT } from 'actions/document-actions'
import { ToggleMenu, toggleMenu, reset } from 'actions/page-actions'

import pageReducer, { initialState } from './page'

const actionFactory = actionCreatorFactory()

const toggleAction = toggleMenu({ menu: 'navigation' })

const deleteDocument = actionFactory.async<{}, typeof document>(ACTION_DELETE_DOCUMENT)
const updateDocument = actionFactory.async<{}, typeof document>(ACTION_UPDATE_DOCUMENT)
const getDocument = actionFactory.async<{}, typeof document>(ACTION_GET_DOCUMENT)

const navigationAction = {
  type: LOCATION_CHANGE
  payload: {}
}

const spinnerState = {
  ...initialState,
  editorToolbar: {
    refreshing: true,
    saving: true,
    deleting: true
  }
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

  const actions = [
    {
      action: deleteDocument, name: 'delete', field: 'deleting'
    },
    {
      action: updateDocument, name: 'update', field: 'saving'
    },
    {
      action: getDocument, name: 'get', field: 'refreshing'
    }]
  actions.forEach(({ action, name, field }) => {
    it(`should set the ${field} status  to true on ${action} action start`, () => {
      const rawAction = action.started({ params: { id: 'foo' } })
      expect(pageReducer(initialState, rawAction).editorToolbar[field]).toBeTruthy()
    })

    it(`should set the ${field} status to false on ${action} action done`, () => {
      const rawAction = action.done({ params: { id: 'foo' }, result: undefined })
      expect(pageReducer(spinnerState, rawAction).editorToolbar[field]).toBeFalsy()
    })

    it(`should set the ${field} status to false on ${action} action failure`, () => {
      const rawAction = action.failed({ params: { id: 'foo' }, error: {} })
      expect(pageReducer(spinnerState, rawAction).editorToolbar[field]).toBeFalsy()
    })
  })
})