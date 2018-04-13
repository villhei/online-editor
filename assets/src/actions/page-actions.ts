import {
  deleteDocument
} from 'actions/document-actions'
import {
  deleteFolder,
  deleteFolders,
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
  getRoot,
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
  items: Map<HasId>,
  testerFn: (x: any) => x is T,
  action: (dispatch: Dispatch<RootState>, params: any) => Promise<ApiResourceId>,
  dispatch: Dispatch<RootState>)
  : Promise<Array<ApiResourceId>> {

  const entities: Array<T> = Object.keys(items)
    .map(id => (items[id] as T))
    .filter(d => testerFn(d))

  const deletions = entities
    .map(param => deleteFolder(dispatch, { id: param.id }))
  return Promise.all(deletions)
}

export const deleteItems = bindThunkAction(deleteFoldersAction, (params, dispatch): Promise<Array<FolderId>> => {
  return deleteEntities(params, isDocument, deleteDocument, dispatch)
    .then(async ids =>
      ids.concat(await
        deleteEntities(params, isFolder, deleteFolder, dispatch)))
})
