import {
  ACTION_CREATE_DOCUMENT,
  ACTION_DELETE_DOCUMENT
} from 'actions/document-actions'
import { TextDocument, TextDocumentId } from 'service/document-service'
import actionCreatorFactory from 'typescript-fsa'

import documentReducer, {
  initialState
} from './documents'

const actionFactory = actionCreatorFactory()
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

const newDocument: TextDocument = {
  ...document,
  id: 'newId',
  name: 'someName',
  owner: 'someGuy',
  content: 'someContent',
  inserted_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
}

const otherDocument: TextDocument = {
  ...newDocument,
  id: 'otherId',
  name: 'otherName',
  owner: 'otherGuy',
  content: 'otherContent'
}

const createDocument = actionFactory.async<{}, TextDocument>(ACTION_CREATE_DOCUMENT)
const deleteDocument = actionFactory.async<{}, TextDocumentId>(ACTION_DELETE_DOCUMENT)

describe('Document reducer', () => {

  it('should fetch documents to the state ', () => {
    const getDocumentAction = createDocument.done({ params: {}, result: newDocument })

    const modifiedState = documentReducer(initialState, getDocumentAction)

    expect(modifiedState.byId).toEqual({
      [newDocument.id]: newDocument
    })
  })

  it('should fetch multiple documents to the state ', () => {
    const getDocumentAction = createDocument.done({ params: {}, result: newDocument })
    const getSecondDocumentAction = createDocument.done({ params: {}, result: otherDocument })

    const modifiedState = documentReducer(documentReducer(initialState, getDocumentAction), getSecondDocumentAction)

    expect(modifiedState.byId).toEqual({
      [newDocument.id]: newDocument,
      [otherDocument.id]: otherDocument
    })
  })

  it('should return the state as-is if action is not recognized', () => {
    expect(documentReducer(initialState, {
      type: 'NOP'
    })).toEqual(initialState)
  })

  it('should save the created document to the state', () => {
    const action = createDocument.done({ params: {}, result: newDocument })
    const modifiedState = documentReducer(initialState, action)
    expect(modifiedState.byId[newDocument.id]).toEqual(newDocument)
  })

  it('should save multiple documents to the state', () => {
    const action = createDocument.done({ params: {}, result: newDocument })
    const second = createDocument.done({ params: {}, result: otherDocument })

    const modifiedState = documentReducer(documentReducer(initialState, action), second)

    expect(modifiedState.byId).toEqual({
      [newDocument.id]: newDocument,
      [otherDocument.id]: otherDocument
    })
  })

  it('should allow removing documents from the state', () => {
    const populatedState = {
      ...initialState,
      byId: {
        [newDocument.id]: newDocument,
        [otherDocument.id]: otherDocument
      }
    }
    const action = deleteDocument.done({ params: {}, result: otherDocument.id })
    const modifiedState = documentReducer(populatedState, action)
    expect(modifiedState.byId).toEqual({
      [newDocument.id]: newDocument
    })
  })
})
