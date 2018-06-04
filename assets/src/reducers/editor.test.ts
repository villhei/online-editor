import { updateDocumentAction } from 'actions/document-actions'
import {
  resetDocumentChanges,
  updateDocumentName,
  updatedocumentContent
} from 'actions/editor-actions'
import { TextDocument } from 'service/document-service'

import editorReducer, { initialState } from './editor'

const updateContentAction = updatedocumentContent({ value: 'updated value' })

const updateNameAction = updateDocumentName({ value: 'updated name' })

const resetAction = resetDocumentChanges(undefined)

const modifiedState = {
  ...initialState,
  modifiedDocument: {
    content: 'foo',
    modifiedName: 'bar'
  }
}

export const document: TextDocument = {
  id: 'foo',
  name: 'example',
  owner: 'barguy',
  folder: 'rootId',
  content: 'example document',
  starred: false,
  inserted_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
}

describe('Editor reducer', () => {

  it('should have a falsy isModified initialy', () => {
    const state = editorReducer(initialState, {
      type: 'NOP'
    })
    expect(state.isModified).toBeFalsy()
  })
  it('should return the state as-is if action is not recognized', () => {
    expect(editorReducer(initialState, {
      type: 'NOP'
    })).toEqual(initialState)
  })

  it('should set the updated editor content on updateContentAction', () => {
    const state = editorReducer(initialState, updateContentAction)
    expect(state.modifiedDocument).toEqual({ content: 'updated value' })
  })

  it('should set the document as modified on updateContentAction', () => {
    const state = editorReducer(initialState, updateContentAction)
    expect(state.isModified).toBeTruthy()
  })

  it('should set the updated document name on updateNameAction', () => {
    const state = editorReducer(initialState, updateNameAction)
    expect(state.modifiedDocument).toEqual({ name: 'updated name' })
  })

  it('should set the document as modified on updateNameAction', () => {
    const state = editorReducer(initialState, updateNameAction)
    expect(state.isModified).toBeTruthy()
  })

  it('should reset the modifications to document', () => {
    const state = editorReducer(modifiedState, resetAction)
    expect(state.modifiedDocument).toEqual(initialState.modifiedDocument)
  })

  it('should reset the modifications on document update', () => {
    const action = updateDocumentAction.done({ params: { id: document.id, resource: document }, result: document })
    const state = editorReducer(modifiedState, action)
    expect(state.modifiedDocument).toEqual(initialState.modifiedDocument)
  })

  it('should reset the modified status on navigate action', () => {
    const action = updateDocumentAction.done({ params: { id: document.id, resource: document }, result: document })
    const state = editorReducer(modifiedState, action)
    expect(state.isModified).toBeFalsy()
  })

})
