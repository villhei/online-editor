import actionCreatorFactory from 'typescript-fsa'
import { push } from 'react-router-redux'
import { wrapAsyncWorker } from './async'

import {
  Folder,
  FolderId,
  getRoot,
  create,
  getByFolderId,
  findByParent,
  PartialFolder
} from 'service/folder-service'
import { ApiResource, ApiResourceId, ByIdParams } from 'service/common'

export const ACTION_GET_FOLDER = 'ACTION_GET_FOLDER'
export const ACTION_CREATE_FOLDER = 'ACTION_CREATE_FOLDER'
export const ACTION_GET_ROOT_FOLDER = 'ACTION_GET_ROOT_FOLDER'
export const ACTION_GET_CHILDREN = 'ACTION_GET_CHILDREN'
export const ACTION_SELECT_FOLDER = 'ACTION_SELECT_FOLDER'

export type CreateFolderParams = { folder: PartialFolder }

const actionCreator = actionCreatorFactory()

export const getRootAction = actionCreator
  .async<undefined, Folder, {}>(ACTION_GET_ROOT_FOLDER)

export const getFolderAction = actionCreator
  .async<ByIdParams, Folder, {}>(ACTION_GET_FOLDER)

export const getChildrenAction = actionCreator
  .async<ByIdParams, Array<Folder>, {}>(ACTION_GET_CHILDREN)

export const createFolderAction = actionCreator
  .async<CreateFolderParams, Folder, {}>(ACTION_CREATE_FOLDER)

export const selectFolder = (params: ByIdParams) => push('/folder/' + params.id)

export const getRootFolder = wrapAsyncWorker(getRootAction, getRoot)

export const getFolder = wrapAsyncWorker(getFolderAction,
  ({ id }: ByIdParams) => getByFolderId(id))

export const getChildren = wrapAsyncWorker(getChildrenAction,
  ({ id }: ByIdParams) => findByParent(id))

export const createFolder = wrapAsyncWorker(createFolderAction, ({ folder }) =>
  create(folder))
