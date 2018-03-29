import actionCreatorFactory from 'typescript-fsa'
import { wrapAsyncWorker } from './async'

import {
  update,
  create,
  getById,
  getAll,
  deleteById,
  TextDocumentId,
  TextDocument,
  PartialTextDocument,
  getAllByFolder
} from 'service/document-service'

export type DocumentByIdParams = { id: TextDocumentId }
export type UpdateDocumentParams = { id: TextDocumentId, document: PartialTextDocument }
export type GetDocumentByFolderParams = { folder: string }

export const ACTION_GET_DOCUMENT = 'ACTION_GET_DOCUMENT'
export const ACTION_GET_DOCUMENTS = 'ACTION_GET_DOCUMENTS'
export const ACTION_GET_DOCUMENTS_BY_FOLDER = 'ACTION_GET_DOCUMENTS_BY_FOLDER'

export const ACTION_CREATE_DOCUMENT = 'ACTION_CREATE_DOCUMENT'
export const ACTION_UPDATE_DOCUMENT = 'ACTION_UPDATE_DOCUMENT'
export const ACTION_DELETE_DOCUMENT = 'ACTION_DELETE_DOCUMENT'

const actionCreator = actionCreatorFactory()

export const createDocumentAction = actionCreator
  .async<undefined, TextDocument, {}>(ACTION_CREATE_DOCUMENT)

export const getDocumentAction = actionCreator
  .async<DocumentByIdParams, TextDocument, {}>(ACTION_GET_DOCUMENT)

export const getDocumentsAction = actionCreator
  .async<undefined, Array<TextDocument>, {}>(ACTION_GET_DOCUMENTS)

export const getDocumentsByFolderAction = actionCreator
  .async<GetDocumentByFolderParams, Array<TextDocument>, {}>(ACTION_GET_DOCUMENTS_BY_FOLDER)

export const updateDocumentAction = actionCreator
  .async<UpdateDocumentParams, TextDocument, {}>(ACTION_UPDATE_DOCUMENT)

export const deleteDocumentAction = actionCreator
  .async<DocumentByIdParams, void>(ACTION_DELETE_DOCUMENT)

export const createDocument = wrapAsyncWorker(createDocumentAction, create)
export const getDocument = wrapAsyncWorker(getDocumentAction, (params: DocumentByIdParams) => getById(params.id))
export const getDocuments = wrapAsyncWorker(getDocumentsAction, getAll)
export const getDocumentsByFolder = wrapAsyncWorker(getDocumentsAction, getAllByFolder)
export const updateDocument = wrapAsyncWorker(updateDocumentAction, (params: UpdateDocumentParams) => update(params.id, params.document))
export const deleteDocument = wrapAsyncWorker(deleteDocumentAction, (params: DocumentByIdParams) => deleteById(params.id))
