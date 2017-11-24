import actionCreatorFactory from 'typescript-fsa'
import { UPDATE_DOCUMENT_CONTENT, RESET_DOCUMENT_CHANGES }from 'constants/editor'
const actionCreator = actionCreatorFactory()

export type UpdateDocumentContent = {
  value: string
}

export const resetDocumentChanges = actionCreator<undefined>(RESET_DOCUMENT_CHANGES)

export const updatedocumentContent = actionCreator<UpdateDocumentContent>(UPDATE_DOCUMENT_CONTENT)
