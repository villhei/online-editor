import actionCreatorFactory from 'typescript-fsa'
import { bindThunkAction }from 'typescript-fsa-redux-thunk'
import { push } from 'react-router-redux'
import { UPDATE_DOCUMENT_CONTENT, RESET_DOCUMENT_CHANGES }from 'constants/editor'
import { deleteDocumentAction, createDocumentAction, getDocuments} from './document-actions'
import { TextDocument, deleteById, create } from 'service/document-service'

const actionCreator = actionCreatorFactory()

export type UpdateDocumentContent = {
  value: string
}

export const resetDocumentChanges = actionCreator<undefined>(RESET_DOCUMENT_CHANGES)

export const updatedocumentContent = actionCreator<UpdateDocumentContent>(UPDATE_DOCUMENT_CONTENT)

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