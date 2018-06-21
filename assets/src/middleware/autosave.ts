import { updateDocument, updateDocumentAction } from 'actions/document-actions'
import { modifyDocument } from 'actions/editor-actions'
import { RootState } from 'main/store'
import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from 'redux'
import { isType } from 'typescript-fsa'

const AUTOSAVE_TRIGGER_DELAY_MS = 3000
let saveTimeout: number | null = null

const autoSaveMiddleware: Middleware =
  (api: MiddlewareAPI<Dispatch<AnyAction>, RootState>) =>
    (next: Dispatch<AnyAction>) => (action: AnyAction) => {
      if (isType(action, updateDocumentAction.started) && saveTimeout !== null) {
        window.clearTimeout(saveTimeout)
      }
      if (isType(action, modifyDocument)) {
        if (saveTimeout !== null) {
          window.clearTimeout(saveTimeout)
        }
        saveTimeout = window.setTimeout(() => {
          updateDocument(api.dispatch, {
            id: action.payload.id,
            resource: api.getState().state.editor.modifiedDocument
          })
          saveTimeout = null
        }, AUTOSAVE_TRIGGER_DELAY_MS)
      }
      return next(action)
    }

export default autoSaveMiddleware
