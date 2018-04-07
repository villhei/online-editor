import actionCreatorFactory from 'typescript-fsa'
import { bindThunkAction } from 'typescript-fsa-redux-thunk'
import { push } from 'react-router-redux'
import {
  deleteDocumentAction,
  createDocumentAction,
  updateDocumentAction,
  CreateDocumentParams,
  UpdateDocumentParams,
  updateDocument
} from './document-actions'

import {
  createFolder, createFolderAction, CreateFolderParams
} from './folder-actions'

import { TextDocument, create, deleteById, update } from 'service/document-service'
import { Folder } from 'service/folder-service'

import { getFolder } from 'actions/folder-actions'

export const UPDATE_DOCUMENT_CONTENT = 'UPDATE_DOCUMENT_CONTENT'
export const UPDATE_DOCUMENT_NAME = 'UPDATE_DOCUMENT_NAME'
export const RESET_DOCUMENT_CHANGES = 'RESET_DOCUMENT_CHANGES'
export const TOGGLE_DOCUMENT_RENAME = 'TOGGLE_DOCUMENT_RENAME'
export const EXPECT_CONFIRM_ACTION = 'EXPECT_CONFIRM_ACTION'

const actionCreator = actionCreatorFactory()

export type ConfirmActionName = 'home' | 'view' | 'refresh' | 'delete' | undefined

export type ExpectConfirmAction = {
  action: ConfirmActionName
}

export type UpdateParams = {
  value: string
}

export const resetDocumentChanges = actionCreator<undefined>(RESET_DOCUMENT_CHANGES)

export const updatedocumentContent = actionCreator<UpdateParams>(UPDATE_DOCUMENT_CONTENT)

export const updateDocumentName = actionCreator<UpdateParams>(UPDATE_DOCUMENT_NAME)

export const expectConfirmAction = actionCreator<ExpectConfirmAction>(EXPECT_CONFIRM_ACTION)

export const deleteAndRefresh = bindThunkAction(deleteDocumentAction, async (params, dispatch): Promise<void> => {
  await deleteById(params.document.id)
  await getFolder(dispatch, { id: params.document.folder })
  dispatch(push('/'))
})

export const createAndSelect = bindThunkAction(createDocumentAction, async (params: CreateDocumentParams, dispatch): Promise<TextDocument> => {
  const document = await create(params.document)
  getFolder(dispatch, { id: document.folder })
  dispatch(push('/edit/' + document.id))
  return document
})

export const createFolderAndRefresh = bindThunkAction(createFolderAction, async (params: CreateFolderParams, dispatch): Promise<Folder> => {
  const folder = await createFolder(dispatch, params)
  getFolder(dispatch, { id: folder.parent })
  return folder
})

export const updateAndRefresh = bindThunkAction(updateDocumentAction, async (params: UpdateDocumentParams, dispatch): Promise<TextDocument> => {
  const document = await updateDocument(dispatch, params)
  getFolder(dispatch, { id: document.folder })
  return document
})
