import { AxiosError } from 'axios'
import {
  ByIdParams,
  ByResourceParams,
  HasId,
  Map,
  UpdateByIdParams
} from 'library/service/common'
import { push } from 'react-router-redux'
import {
  Folder,
  FolderId,
  PartialFolder,
  create,
  deleteByFolder,
  deleteMultiple,
  findByParent,
  getByFolderId,
  update
} from 'service/folder-service'
import actionCreatorFactory from 'typescript-fsa'

import { wrapAsyncWorker } from './async'

const ACTION_GET_FOLDER = 'ACTION_GET_FOLDER'
const ACTION_CREATE_FOLDER = 'ACTION_CREATE_FOLDER'
const ACTION_GET_ROOT_FOLDER = 'ACTION_GET_ROOT_FOLDER'
const ACTION_GET_CHILDREN = 'ACTION_GET_CHILDREN'
const ACTION_DELETE_FOLDER = 'ACTION_DELETE_FOLDER'
const ACTION_DELETE_FOLDERS = 'ACTION_DELETE_FOLDERS'
const ACTION_UPDATE_FOLDER = 'ACTION_UPDATE_FOLDER'

const actionCreator = actionCreatorFactory()

export const getRootAction = actionCreator
  .async<{}, Folder, AxiosError>(ACTION_GET_ROOT_FOLDER)

export const getFolderAction = actionCreator
  .async<ByIdParams, Folder, AxiosError>(ACTION_GET_FOLDER)

export const getChildrenAction = actionCreator
  .async<ByIdParams, Array<Folder>, AxiosError>(ACTION_GET_CHILDREN)

export const createFolderAction = actionCreator
  .async<ByResourceParams<PartialFolder>, Folder, AxiosError>(ACTION_CREATE_FOLDER)

export const updateFolderAction = actionCreator
  .async<UpdateByIdParams<PartialFolder>, Folder, AxiosError>(ACTION_UPDATE_FOLDER)

export const deleteFolderaction = actionCreator
  .async<ByResourceParams<Folder>, FolderId, AxiosError>(ACTION_DELETE_FOLDER)

export const deleteFoldersAction = actionCreator
  .async<Map<HasId>, Array<FolderId>,AxiosError>(ACTION_DELETE_FOLDERS)

export const showFolder = (params: ByIdParams) => push('/folder/' + params.id)

export const getFolder = wrapAsyncWorker(getFolderAction,
  ({ id }: ByIdParams) => getByFolderId(id))

export const getChildren = wrapAsyncWorker(getChildrenAction,
  ({ id }: ByIdParams) => findByParent(id))

export const createFolder = wrapAsyncWorker(createFolderAction, ({ resource }) =>
  create(resource))

export const updateFolder = wrapAsyncWorker(updateFolderAction, ({ id, resource }) =>
  update(id, resource))

export const deleteFolder = wrapAsyncWorker(deleteFolderaction, ({ resource }) =>
  deleteByFolder(resource))

export const deleteFolders = wrapAsyncWorker(deleteFoldersAction, items => deleteMultiple(items))
