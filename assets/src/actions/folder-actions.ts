import actionCreatorFactory from 'typescript-fsa'
import { wrapAsyncWorker } from './async'

import {
  Folder,
  FolderId,
  getRoot,
  getByFolderId,
  findByParent
} from 'service/folder-service'

export const ACTION_GET_FOLDER = 'ACTION_GET_FOLDER'
export const ACTION_GET_ROOT_FOLDER = 'ACTION_GET_ROOT_FOLDER'
export const ACTION_GET_CHILDREN = 'ACTION_GET_CHILDREN'

export type GetByIdParams = { id: FolderId }

const actionCreator = actionCreatorFactory()

export const getRootAction = actionCreator
  .async<undefined, Folder, {}>(ACTION_GET_ROOT_FOLDER)

export const getFolderAction = actionCreator
  .async<GetByIdParams, Folder, {}>(ACTION_GET_FOLDER)

export const getChildrenAction = actionCreator
  .async<GetByIdParams, Array<Folder>, {}>(ACTION_GET_CHILDREN)

export const getRootFolder = wrapAsyncWorker(getRootAction, getRoot)

export const getFolder = wrapAsyncWorker(getFolderAction,
  ({ id }: GetByIdParams) => getByFolderId(id))

export const getChildren = wrapAsyncWorker(getChildrenAction,
  ({ id }: GetByIdParams) => findByParent(id))
