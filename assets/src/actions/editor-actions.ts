import actionCreatorFactory from 'typescript-fsa'
import { bindThunkAction } from 'typescript-fsa-redux-thunk'
import { push } from 'react-router-redux'
import { deleteDocumentAction, createDocumentAction, getDocuments, updateDocumentAction } from './document-actions'
import { TextDocument, deleteById, create, update } from 'service/document-service'

import {
  UPDATE_DOCUMENT_CONTENT,
  UPDATE_DOCUMENT_NAME,
  RESET_DOCUMENT_CHANGES
} from 'constants/editor'

const actionCreator = actionCreatorFactory()

export type UpdateParams = {
  value: string
}

export const resetDocumentChanges = actionCreator<undefined>(RESET_DOCUMENT_CHANGES)

export const updatedocumentContent = actionCreator<UpdateParams>(UPDATE_DOCUMENT_CONTENT)

export const updateDocumentName = actionCreator<UpdateParams>(UPDATE_DOCUMENT_NAME)

export const deleteAndRefresh = bindThunkAction(deleteDocumentAction, async (params, dispatch): Promise<void> => {
  await deleteById(params.id)
  getDocuments(dispatch, undefined)
  dispatch(push('/'))
})

export const createAndSelect = bindThunkAction(createDocumentAction, async (params, dispatch): Promise<TextDocument> => {
  const document = await create()
  dispatch(push('/edit/' + document.id))
  return document
})

export const updateAndRefresh = bindThunkAction(updateDocumentAction, async(params, dispatch): Promise<TextDocument> => {
  const document = await update(params.id, params.document)
  getDocuments(dispatch, undefined)
  return document
})