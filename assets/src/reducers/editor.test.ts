import { Action } from 'redux'
import actionCreatorFactory from 'typescript-fsa'
import { LOCATION_CHANGE } from 'react-router-redux'
import { UPDATE_DOCUMENT_CONTENT, UPDATE_DOCUMENT_NAME } from 'constants/editor'
import { updatedocumentContent, updateDocumentName, resetDocumentChanges } from 'actions/editor-actions'
import editorReducer, { initialState } from './editor'

const updateContentAction = updatedocumentContent({ value: 'updated value' })

const updateNameAction = updateDocumentName({ value: 'updated name' })

const resetAction = resetDocumentChanges()

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
    const state = editorReducer({ ...initialState, modifiedContent: 'foo', modifiedName: 'bar' }, resetAction)
    expect(state).toEqual(initialState)
  })

})