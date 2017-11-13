import actionCreatorFactory from 'typescript-fsa'
import { UPDATE_DOCUMENT_CONTENT }from 'constants/editor'
const actionCreator = actionCreatorFactory()

export type UpdateDocumentContent = {
  value: string
}

export const updatedocumentContent = actionCreator<UpdateDocumentContent>(UPDATE_DOCUMENT_CONTENT)
