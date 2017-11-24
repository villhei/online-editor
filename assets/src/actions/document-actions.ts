import {
  ACTION_CREATE_DOCUMENT,
  ACTION_GET_DOCUMENT,
  ACTION_GET_DOCUMENTS,
  ACTION_UPDATE_DOCUMENT
} from 'constants/document'

import actionCreatorFactory from 'typescript-fsa'
import { wrapAsyncWorker } from './async'

import { update, create, getById, getAll, TextDocument } from 'service/document-service'

export type GetDocumentParams = { id: string }
export type UpdateDocumentParams = TextDocument

const actionCreator = actionCreatorFactory()

export const createDocumentAction = actionCreator
  .async<undefined, TextDocument, {}>(ACTION_CREATE_DOCUMENT)

export const getDocumentAction = actionCreator
  .async<GetDocumentParams, TextDocument, {}>(ACTION_GET_DOCUMENT)

export const getDocumentsAction = actionCreator
  .async<undefined, Array<TextDocument>, {}>(ACTION_GET_DOCUMENTS)

export const updateDocumentAction = actionCreator
  .async<UpdateDocumentParams, TextDocument, {}>(ACTION_UPDATE_DOCUMENT)

export const createDocument = wrapAsyncWorker(createDocumentAction, create)
export const getDocument = wrapAsyncWorker(getDocumentAction, (params: GetDocumentParams) => getById(params.id))
export const getDocuments = wrapAsyncWorker(getDocumentsAction, getAll)
export const updateDocument = wrapAsyncWorker(getDocumentAction, (params: UpdateDocumentParams) => update(params))

