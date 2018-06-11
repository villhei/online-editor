import {
  ByIdParams,
  ByResourceParams,
  HasId,
  Map,
  UpdateByIdParams
} from 'library/service/common'
import {
  PartialTextDocument,
  TextDocument,
  TextDocumentId,
  create,
  deleteByDocument,
  deleteMultiple,
  getAll,
  getById,
  update
} from 'service/document-service'
import {
  FolderId
} from 'service/folder-service'
import actionCreatorFactory from 'typescript-fsa'

import { wrapAsyncWorker } from './async'

export type GetDocumentByFolderParams = { folder: FolderId }

export const ACTION_GET_DOCUMENT = 'ACTION_GET_DOCUMENT'
export const ACTION_GET_DOCUMENTS = 'ACTION_GET_DOCUMENTS'
export const ACTION_GET_DOCUMENTS_BY_FOLDER = 'ACTION_GET_DOCUMENTS_BY_FOLDER'

export const ACTION_CREATE_DOCUMENT = 'ACTION_CREATE_DOCUMENT'
export const ACTION_UPDATE_DOCUMENT = 'ACTION_UPDATE_DOCUMENT'
export const ACTION_DELETE_DOCUMENT = 'ACTION_DELETE_DOCUMENT'
export const ACTION_DELETE_DOCUMENTS = 'ACTION_DELETE_DOCUMENTS'

const actionCreator = actionCreatorFactory()

export const createDocumentAction = actionCreator
  .async<ByResourceParams<PartialTextDocument>, TextDocument, {}>(ACTION_CREATE_DOCUMENT)

export const getDocumentAction = actionCreator
  .async<ByIdParams, TextDocument, {}>(ACTION_GET_DOCUMENT)

export const getDocumentsAction = actionCreator
  .async<undefined, Array<TextDocument>, {}>(ACTION_GET_DOCUMENTS)

export const getDocumentsByFolderAction = actionCreator
  .async<GetDocumentByFolderParams, Array<TextDocument>, {}>(ACTION_GET_DOCUMENTS_BY_FOLDER)

export const updateDocumentAction = actionCreator
  .async<UpdateByIdParams<PartialTextDocument>, TextDocument, {}>(ACTION_UPDATE_DOCUMENT)

export const deleteDocumentAction = actionCreator
  .async<ByResourceParams<TextDocument>, TextDocumentId>(ACTION_DELETE_DOCUMENT)

export const deleteDocumentsAction = actionCreator
  .async<Map<HasId>, Array<TextDocumentId>>(ACTION_DELETE_DOCUMENTS)

export const createDocument = wrapAsyncWorker(createDocumentAction, (params: ByResourceParams<PartialTextDocument>) => create(params.resource))
export const getDocument = wrapAsyncWorker(getDocumentAction, (params: ByIdParams) => getById(params.id))
export const getDocuments = wrapAsyncWorker(getDocumentsAction, getAll)
export const updateDocument = wrapAsyncWorker(updateDocumentAction, (params: UpdateByIdParams<PartialTextDocument>) => update(params.id, params.resource))
export const deleteDocument = wrapAsyncWorker(deleteDocumentAction, (params: ByResourceParams<TextDocument>) => deleteByDocument(params.resource))
export const deleteDocuments = wrapAsyncWorker(deleteDocumentsAction, items => deleteMultiple(items))
