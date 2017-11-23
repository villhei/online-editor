import actionCreatorFactory from 'typescript-fsa'
import { ACTION_CREATE_DOCUMENT, ACTION_GET_DOCUMENT, ACTION_GET_DOCUMENTS } from 'constants/document'
import { wrapAsyncWorker } from './async'

import { create, getById, getAll, TextDocument } from 'service/document-service'

export type GetDocumentParams = {id: string }

const actionCreator = actionCreatorFactory()

export const createDocumentAction = actionCreator.async<undefined, TextDocument, {}>(ACTION_CREATE_DOCUMENT)
export const getDocumentAction = actionCreator.async<GetDocumentParams, TextDocument, {}>(ACTION_GET_DOCUMENT)
export const getDocumentsAction = actionCreator.async<undefined, Array<TextDocument>, {}>(ACTION_GET_DOCUMENTS)

export const createDocument = wrapAsyncWorker(createDocumentAction, create)
export const getDocument = wrapAsyncWorker(getDocumentAction, (params: GetDocumentParams) => getById(params.id))
export const getDocuments = wrapAsyncWorker(getDocumentsAction, getAll)
