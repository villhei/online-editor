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

const modifiedState = { ...initialState, modifiedContent: 'foo', modifiedName: 'bar' }

export const document: TextDocument = {
  id: 'foo',
  name: 'example',
  owner: 'barguy',
  folder: 'rootId',
  content: 'example document',
  inserted_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
}

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
    const action = updateDocumentAction.done({ params: { id: document.id, document }, result: document })
    expect(editorReducer(modifiedState, action)).toEqual(initialState)
  })
})
