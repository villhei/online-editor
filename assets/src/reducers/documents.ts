import { Action } from 'redux'
import { isType } from 'typescript-fsa'
import { getDocumentAction, getDocumentsAction } from 'actions/document-actions'
import { TextDocument, TextDocumentId } from 'service/document-service'

type DocumentMap = { [id: number]: TextDocument }
export type DocumentReducerState = {
  byId: DocumentMap,
  all: Array<TextDocument>
}

export const initialState: DocumentReducerState = {
  byId: {},
  all: []
}

function updateOrJoin(array: Array<TextDocument>, object: TextDocument): Array<TextDocument> {
  const index = array.findIndex(({ id }) => object.id === id)
  if (index > 0) {
    return Array.from(array).splice(index, 1, object)
  } else {
    return array.concat(object)
  }
}

export default function documentReducer(state: DocumentReducerState = initialState, action: Action): DocumentReducerState {
  if (isType(action, getDocumentsAction.done)) {
    const documents = action.payload.result
    const byId: DocumentMap = documents.reduce((acc, document) => {
      return {
        ...acc,
        [document.id]: document
      }
    }, {})
    return {
      ...state,
      byId,
      all: documents
    }
  }
  if (isType(action, getDocumentAction.done)) {
    const document = action.payload.result
    const byId = { ...state.byId, [document.id]: document }
    const all = updateOrJoin(state.all, document)
    return {
      ...state,
      byId,
      all
    }

  }
  return state
}