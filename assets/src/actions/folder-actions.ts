import actionCreatorFactory from 'typescript-fsa'
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

export const ACTION_GET_FOLDER = 'ACTION_GET_FOLDER'
export const ACTION_CREATE_FOLDER = 'ACTION_CREATE_FOLDER'
export const ACTION_GET_ROOT_FOLDER = 'ACTION_GET_ROOT_FOLDER'
export const ACTION_GET_CHILDREN = 'ACTION_GET_CHILDREN'

export type GetByIdParams = { id: FolderId }
export type CreateFolderParams = { folder: PartialFolder }

const actionCreator = actionCreatorFactory()

export const getRootAction = actionCreator
  .async<undefined, Folder, {}>(ACTION_GET_ROOT_FOLDER)

export const getFolderAction = actionCreator
  .async<GetByIdParams, Folder, {}>(ACTION_GET_FOLDER)

export const getChildrenAction = actionCreator
  .async<GetByIdParams, Array<Folder>, {}>(ACTION_GET_CHILDREN)

export const createFolderAction = actionCreator
  .async<CreateFolderParams, Folder, {}>(ACTION_CREATE_FOLDER)

export const getRootFolder = wrapAsyncWorker(getRootAction, getRoot)

export const getFolder = wrapAsyncWorker(getFolderAction,
  ({ id }: GetByIdParams) => getByFolderId(id))

export const getChildren = wrapAsyncWorker(getChildrenAction,
  ({ id }: GetByIdParams) => findByParent(id))

export const createFolder = wrapAsyncWorker(createFolderAction, ({ folder }) =>
  create(folder))
