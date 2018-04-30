/**
 * @jest-environment node
 */

import { ACTION_DELETE_DOCUMENT, ACTION_GET_DOCUMENT, ACTION_UPDATE_DOCUMENT } from 'actions/document-actions'
import { TextDocument } from 'service/document-service'
import actionCreatorFactory from 'typescript-fsa'

import pageReducer, { initialState } from './page'

const actionFactory = actionCreatorFactory()

const spinnerState = {
  ...initialState,
  editorToolbar: {
    refreshing: true,
    saving: true,
    deleting: true
  }
}

export const document: TextDocument = {
  id: 'foo',
  name: 'example',
  owner: 'barguy',
  folder: 'rootId',
  content: 'example document',
  inserted_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
}

const deleteDocument = actionFactory.async<{}, TextDocument>(ACTION_DELETE_DOCUMENT)
const updateDocument = actionFactory.async<{}, TextDocument>(ACTION_UPDATE_DOCUMENT)
const getDocument = actionFactory.async<{}, TextDocument>(ACTION_GET_DOCUMENT)

describe('Page reducer', () => {
  it('should return the state as-is if action is not recognized', () => {
    expect(pageReducer(initialState, {
      type: 'NOP'
    })).toEqual(initialState)
  })

  type ActionTestCase = {
    action: typeof deleteDocument | typeof updateDocument | typeof getDocument,
    name: string,
    field: 'deleting' | 'saving' | 'refreshing'
  }

  const actions: Array<ActionTestCase> = [
    {
      action: deleteDocument, name: 'delete', field: 'deleting'
    },
    {
      action: updateDocument, name: 'update', field: 'saving'
    },
    {
      action: getDocument, name: 'get', field: 'refreshing'
    }]
  actions.forEach(({ action, field }: ActionTestCase) => {
    it(`should set the ${field} status  to true on ${action} action start`, () => {
      const rawAction = action.started({ params: { id: 'foo' } })
      expect(pageReducer(initialState, rawAction).editorToolbar[field]).toBeTruthy()
    })

    it(`should set the ${field} status to false on ${action} action done`, () => {
      const rawAction = action.done({ params: { id: 'foo' }, result: document })
      expect(pageReducer(spinnerState, rawAction).editorToolbar[field]).toBeFalsy()
    })

    it(`should set the ${field} status to false on ${action} action failure`, () => {
      const rawAction = action.failed({ params: { id: 'foo' }, error: {} })
      expect(pageReducer(spinnerState, rawAction).editorToolbar[field]).toBeFalsy()
    })
  })
})
