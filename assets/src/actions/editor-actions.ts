import actionCreatorFactory from 'typescript-fsa'
import { bindThunkAction } from 'typescript-fsa-redux-thunk'
import { push } from 'react-router-redux'
import {
  deleteDocumentAction,
  createDocumentAction,
  getDocuments,
  updateDocumentAction
} from './document-actions'

import { TextDocument, deleteById, create, update } from 'service/document-service'

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
  await deleteById(params.id)
  await getDocuments(dispatch, undefined)
  dispatch(push('/'))
})

export const createAndSelect = bindThunkAction(createDocumentAction, async (params, dispatch): Promise<TextDocument> => {
  const document = await create()
  dispatch(push('/edit/' + document.id))
  return document
})

export const updateAndRefresh = bindThunkAction(updateDocumentAction, async (params, dispatch): Promise<TextDocument> => {
  const document = await update(params.id, params.document)
  getDocuments(dispatch, undefined)
  return document
})
