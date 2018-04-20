import {
  deleteDocument
} from 'actions/document-actions'
import {
  deleteFolder,
  deleteFoldersAction,
  getRootAction,
  getRootFolder
} from 'actions/folder-actions'
import { Dispatch } from 'react-redux'
import { push } from 'react-router-redux'
import {
  ApiResourceId,
  ByIdParams,
  ByResourceParams,
  HasId,
  Map
} from 'service/common'
import {
  TextDocument, isDocument
} from 'service/document-service'
import {
  Folder,
  FolderId,
  isFolder
} from 'service/folder-service'
import actionCreatorFactory from 'typescript-fsa'
import { bindThunkAction } from 'typescript-fsa-redux-thunk'

import { RootState } from '../reducer'
const actionCreator = actionCreatorFactory()

export const TOGGLE_MENU = 'TOGGLE_MENU'

export const CLEAR_ERROR = 'CLEAR_ERROR'

export const SET_SELECTED_ITEMS = 'SET_SELECTED_ITEMS'

export const ACTION_DELETE_DOCUMENT = 'ACTION_DELETE_DOCUMENT'

export const deleteDocumentAction = actionCreator
  .async<ByIdParams, ByResourceParams<TextDocument>>(ACTION_DELETE_DOCUMENT)

export type ToggleMenu = {
  menu: string
}

export type SelectedItems = {
  selection: Map<HasId>
}

export const toggleMenu = actionCreator<ToggleMenu>(TOGGLE_MENU)
export const clearError = actionCreator<undefined>(CLEAR_ERROR)
export const setSelectedItems = actionCreator<SelectedItems>(SET_SELECTED_ITEMS)

export const selectRootFolder = bindThunkAction(getRootAction, async (params, dispatch): Promise<Folder> => {
  const folder = await getRootFolder(dispatch, undefined)
  dispatch(push('/folder/' + folder.id))
  return folder
})

export const moveItems = bindThunkAction(getRootAction, async (params, dispatch): Promise<Folder> => {
  const folder = await getRootFolder(dispatch, undefined)
  dispatch(push('/folder/' + folder.id))
  return folder
})

function deleteEntities<T extends HasId>(
  entities: Array<T>,
  dispatch: Dispatch<RootState>,
  action: (dispatch: Dispatch<RootState>, params: { resource: T }) => Promise<ApiResourceId>
)
  : Promise<Array<ApiResourceId>> {
  const deletions = entities
    .map(entity => action(dispatch, { resource: entity }))
  return Promise.all(deletions)
}

function filterEntities<T extends HasId>(items: Map<HasId>, typeTesterFn: (x: any) => x is T) {
  const entities: Array<T> = Object.keys(items)
    .filter(d => typeTesterFn(items[d]))
    .map((id: string) => (items[id] as T))
  return entities
}

export const deleteItems = bindThunkAction(deleteFoldersAction, (items, dispatch): Promise<Array<FolderId>> => {
  const documents = filterEntities(items, isDocument)
  const folders = filterEntities(items, isFolder)

  const deletedEntities = deleteEntities(documents, dispatch, deleteDocument)
    .then(async ids =>
      ids.concat(await
        deleteEntities(folders, dispatch, deleteFolder)))

  return deletedEntities
})
