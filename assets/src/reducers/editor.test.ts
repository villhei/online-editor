import { Action } from 'redux'
import actionCreatorFactory from 'typescript-fsa'
import { UPDATE_DOCUMENT_CONTENT } from 'constants/editor'
import { updatedocumentContent, UpdateDocumentContent } from 'actions/editor-actions'
import editorReducer, { initialState } from './editor'

const actionFactory = actionCreatorFactory()

const updateAction = updatedocumentContent({ value: 'updated value' })

describe('Editor reducer', () => {
  it('should return the state as-is if action is not recognized', () => {
    expect(editorReducer(initialState, {
      type: 'NOP'
    })).toEqual(initialState)
  })

  it('should set the updated editor content', () => {
    const state = editorReducer(initialState, updateAction)
    expect(state.modifiedContent).toEqual('updated value')
  })
})