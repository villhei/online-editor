import {
  deleteDocument,
  updateDocument
} from 'actions/document-actions'
import {
  deleteFolder,
  deleteFoldersAction,
  getFolder,
  getRootAction,
  getRootFolder,
  updateFolder
} from 'actions/folder-actions'
import {
  ApiResourceId,
  ByIdParams,
  ByResourceParams,
  HasId,
  Map
} from 'library/service/common'
import { Dispatch } from 'react-redux'
import { push } from 'react-router-redux'
import { SortableKeys } from 'service/common'
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

const actionCreator = actionCreatorFactory()

export const TOGGLE_MENU = 'TOGGLE_MENU'

export const CLEAR_ERROR = 'CLEAR_ERROR'

export const SELECT_LAYOUT = 'SELECT_LAYOUT'

export const SET_SELECTED_ITEMS = 'SET_SELECTED_ITEMS'

export const ACTION_DELETE_DOCUMENT = 'ACTION_DELETE_DOCUMENT'

export const MOVE_SELECTED_ITEMS = 'MOVE_SELECTED_ITEMS'

export const SET_LIST_ORDERING = 'SET_LIST_ORDERING'

export const deleteDocumentAction = actionCreator
  .async<ByIdParams, ByResourceParams<TextDocument>>(ACTION_DELETE_DOCUMENT)

export type Layout = 'cards' | 'list'

export type ToggleMenu = {
  menu: string
}

export type SelectedItems = {
  selection: Map<HasId>
}

export type MoveSelectedItems = SelectedItems & {
  destination: FolderId
}

export type ListOrder = {
  orderBy: SortableKeys,
  reverse: boolean
}

export const toggleMenu = actionCreator<ToggleMenu>(TOGGLE_MENU)
export const clearError = actionCreator<undefined>(CLEAR_ERROR)
export const selectLayout = actionCreator<Layout>(SELECT_LAYOUT)

export const setSelectedItems = actionCreator<SelectedItems>(SET_SELECTED_ITEMS)

export const setListOrdering = actionCreator<ListOrder>(SET_LIST_ORDERING)

export const moveSelectedItemsAction = actionCreator
  .async<MoveSelectedItems, Array<Folder>>(MOVE_SELECTED_ITEMS)

export const selectRootFolder = bindThunkAction(getRootAction, async (_params, dispatch): Promise<Folder> => {
  const folder = await getRootFolder(dispatch, {})
  dispatch(push('/folder/' + folder.id))
  return folder
})

export const moveItems = bindThunkAction(moveSelectedItemsAction, async ({ selection, destination }, dispatch): Promise<Array<Folder>> => {
  const items = Object.values(selection)
  const documents = items.filter(isDocument)
  const folders = items.filter(isFolder)

  const affectedFolders = [destination]
    .concat(documents.map(document => document.folder))
    .concat(folders.map(folder => folder.parent))

  const modifiedDocuments = documents
    .map(document => ({
      ...document,
      folder: destination
    }))
    .map(document => updateDocument(dispatch, { id: document.id, resource: document }))
  const modifiedFolders = folders
    .map(folder => ({
      ...folder,
      parent: destination
    })).map(folder => updateFolder(dispatch, { id: folder.id, resource: folder }))
  await Promise.all(modifiedDocuments)
  await Promise.all(modifiedFolders)
  return Promise.all(affectedFolders.map(id => getFolder(dispatch, { id })))
})

function deleteEntities<T extends HasId,>(
  entities: Array<T>,
  dispatch: Dispatch,
  action: (dispatch: Dispatch, params: { resource: T }) => Promise<ApiResourceId>
)
  : Promise<Array<ApiResourceId>> {
  const deletions = entities
    .map(entity => action(dispatch, { resource: entity }))
  return Promise.all(deletions)
}

function filterEntities<T extends HasId>(items: Map<HasId>, typeTesterFn: (x: Object) => x is T) {
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
