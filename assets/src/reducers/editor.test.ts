import { Action } from 'redux'
import actionCreatorFactory from 'typescript-fsa'
import { LOCATION_CHANGE } from 'react-router-redux'
import {
  UPDATE_DOCUMENT_CONTENT,
  UPDATE_DOCUMENT_NAME,
  updatedocumentContent,
  updateDocumentName,
  resetDocumentChanges
} from 'actions/editor-actions'
import { updateDocumentAction } from 'actions/document-actions'
import editorReducer, { initialState } from './editor'

const updateContentAction = updatedocumentContent({ value: 'updated value' })

const updateNameAction = updateDocumentName({ value: 'updated name' })

const resetAction = resetDocumentChanges()

const modifiedState = { ...initialState, modifiedContent: 'foo', modifiedName: 'bar' }

describe('Editor reducer', () => {
  it('should return the state as-is if action is not recognized', () => {
    expect(editorReducer(initialState, {
      type: 'NOP'
    })).toEqual(initialState)
  })

  it('should set the updated editor content', () => {
    const state = editorReducer(initialState, updateContentAction)
    expect(state.modifiedContent).toEqual('updated value')
  })

  it('should set the updated document name', () => {
    const state = editorReducer(initialState, updateNameAction)
    expect(state.modifiedName).toEqual('updated name')
  })

  it('should reset the modifications to document', () => {
    const state = editorReducer(modifiedState, resetAction)
    expect(state).toEqual(initialState)
  })

  it('should reset the modifications on document update', () => {
    const action = updateDocumentAction.done({})
    expect(editorReducer(modifiedState, action)).toEqual(initialState)
  })

})