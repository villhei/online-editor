import {
  ACTION_CREATE_DOCUMENT,
  ACTION_GET_DOCUMENT,
  ACTION_GET_DOCUMENTS,
  ACTION_UPDATE_DOCUMENT,
  ACTION_DELETE_DOCUMENT
} from 'constants/document'

import actionCreatorFactory from 'typescript-fsa'
import { wrapAsyncWorker } from './async'
import { bindThunkAction, isSuccess, isFailure } from 'typescript-fsa-redux-thunk'

import { update, create, getById, getAll, deleteById, TextDocument } from 'service/document-service'

export type DocumentByIdParams = { id: string }
export type UpdateDocumentParams = TextDocument

const actionCreator = actionCreatorFactory()

export const createDocumentAction = actionCreator
  .async<undefined, TextDocument, {}>(ACTION_CREATE_DOCUMENT)

export const getDocumentAction = actionCreator
  .async<DocumentByIdParams, TextDocument, {}>(ACTION_GET_DOCUMENT)

export const getDocumentsAction = actionCreator
  .async<undefined, Array<TextDocument>, {}>(ACTION_GET_DOCUMENTS)

export const updateDocumentAction = actionCreator
  .async<UpdateDocumentParams, TextDocument, {}>(ACTION_UPDATE_DOCUMENT)

export const deleteDocumentAction = actionCreator
  .async<DocumentByIdParams, void>(ACTION_DELETE_DOCUMENT)

export const createDocument = wrapAsyncWorker(createDocumentAction, create)
export const getDocument = wrapAsyncWorker(getDocumentAction, (params: DocumentByIdParams) => getById(params.id))
export const getDocuments = wrapAsyncWorker(getDocumentsAction, getAll)
export const updateDocument = wrapAsyncWorker(getDocumentAction, (params: UpdateDocumentParams) => update(params))
export const deleteDocument = wrapAsyncWorker(deleteDocumentAction, (params: DocumentByIdParams) => deleteById(params.id))

export const deleteAndRefresh = bindThunkAction(deleteDocumentAction, async (params, dispatch): Promise<void> => {
  await deleteById(params.id)
  getDocuments(dispatch, undefined)
})