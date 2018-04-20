import { push } from 'react-router-redux'
import {
  ByIdParams,
  ByResourceParams,
  HasId,
  Map
} from 'service/common'
import {
  Folder,
  FolderId,
  PartialFolder,
  create,
  deleteByFolder,
  deleteMultiple,
  findByParent,
  getByFolderId,
  getRoot
} from 'service/folder-service'
import actionCreatorFactory from 'typescript-fsa'

import { wrapAsyncWorker } from './async'

export const ACTION_GET_FOLDER = 'ACTION_GET_FOLDER'
export const ACTION_CREATE_FOLDER = 'ACTION_CREATE_FOLDER'
export const ACTION_GET_ROOT_FOLDER = 'ACTION_GET_ROOT_FOLDER'
export const ACTION_GET_CHILDREN = 'ACTION_GET_CHILDREN'
export const ACTION_SELECT_FOLDER = 'ACTION_SELECT_FOLDER'
export const ACTION_DELETE_FOLDER = 'ACTION_DELETE_FOLDER'
export const ACTION_DELETE_FOLDERS = 'ACTION_DELETE_FOLDERS'

const actionCreator = actionCreatorFactory()

export const getRootAction = actionCreator
  .async<undefined, Folder, {}>(ACTION_GET_ROOT_FOLDER)

export const getFolderAction = actionCreator
  .async<ByIdParams, Folder, {}>(ACTION_GET_FOLDER)

export const getChildrenAction = actionCreator
  .async<ByIdParams, Array<Folder>, {}>(ACTION_GET_CHILDREN)

export const createFolderAction = actionCreator
  .async<ByResourceParams<PartialFolder>, Folder, {}>(ACTION_CREATE_FOLDER)

export const deleteFolderaction = actionCreator
  .async<ByResourceParams<Folder>, FolderId, {}>(ACTION_DELETE_FOLDER)

export const deleteFoldersAction = actionCreator
  .async<Map<HasId>, Array<FolderId>, {}>(ACTION_DELETE_FOLDERS)

export const showFolder = (params: ByIdParams) => push('/folder/' + params.id)

export const getRootFolder = wrapAsyncWorker(getRootAction, getRoot)

export const getFolder = wrapAsyncWorker(getFolderAction,
  ({ id }: ByIdParams) => getByFolderId(id))

export const getChildren = wrapAsyncWorker(getChildrenAction,
  ({ id }: ByIdParams) => findByParent(id))

export const createFolder = wrapAsyncWorker(createFolderAction, ({ resource }) =>
  create(resource))

export const deleteFolder = wrapAsyncWorker(deleteFolderaction, ({ resource: { id } }) =>
  deleteByFolder({ id }))

export const deleteFolders = wrapAsyncWorker(deleteFoldersAction, items => deleteMultiple(items))
