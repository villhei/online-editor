import { Action } from 'redux'
import { TextDocument } from 'service/document-service'
import actionCreatorFactory from 'typescript-fsa'
import { ACTION_GET_DOCUMENT, ACTION_GET_DOCUMENTS } from 'constants/document'
import documentReducer, { initialState, DocumentReducerState } from './documents'

const actionFactory = actionCreatorFactory()
const document: TextDocument = {
  id: 'foo',
  name: 'example',
  owner: 'barguy',
  content: 'example document',
  inserted_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
}

const other: TextDocument = {
  id: 'bar',
  name: 'example2',
  owner: 'barguy',
  content: 'example document 2',
  inserted_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
}

const modifiedDocument: TextDocument = {
  ...document,
  content: 'modified content'
}

const documents = [
  document,
  other
]

const getDocuments = actionFactory.async<{}, typeof documents>(ACTION_GET_DOCUMENTS)
const getDocument = actionFactory.async<{}, typeof document>(ACTION_GET_DOCUMENT)

describe('Document reducer', () => {
  it('should return the state as-is if action is not recognized', () => {
    expect(documentReducer(initialState, {
      type: 'NOP'
    })).toEqual(initialState)
  })

  it('should save the added documents to the state', () => {
    const action = getDocuments.done({ params: {}, result: documents })
    const modifiedState = documentReducer(initialState, action)
    expect(modifiedState.all).toEqual(documents)
  })

  it('should update the modified document', () => {
    const state = {
      byId: {
        [document.id]: document,
        [other.id]: other
      },
      all: documents
    }
    const action = getDocument.done({ params: {}, result: modifiedDocument })
    const modifiedState = documentReducer(state, action)
    expect(modifiedState.all).toEqual([modifiedDocument, other])
  })
})