import actionCreatorFactory from 'typescript-fsa'
import { ACTION_GET_DOCUMENT, ACTION_GET_DOCUMENTS } from 'constants/document'
import { wrapAsyncWorker } from './async'

import { getById, getAll, TextDocument } from 'service/document-service'

export type GetDocumentParams = {id: string }

const actionCreator = actionCreatorFactory()

export const getDocumentAction = actionCreator.async<GetDocumentParams, TextDocument, {}>(ACTION_GET_DOCUMENT)
export const getDocumentsAction = actionCreator.async<undefined, Array<TextDocument>, {}>(ACTION_GET_DOCUMENTS)

export const getDocument = wrapAsyncWorker(getDocumentAction, (params: GetDocumentParams) => getById(params.id))
export const getDocuments = wrapAsyncWorker(getDocumentsAction, getAll)
