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

export type GetChildrenParams = FolderId
const actionCreator = actionCreatorFactory()

export const getRootAction = actionCreator
  .async<undefined, Folder, {}>(ACTION_GET_ROOT_FOLDER)

export const getByIdAction = actionCreator
  .async<FolderId, Folder, {}>(ACTION_GET_FOLDER)

export const getChildrenAction = actionCreator
  .async<GetChildrenParams, Array<Folder>, {}>(ACTION_GET_CHILDREN)

export const getRootFolder = wrapAsyncWorker(getRootAction, getRoot)

export const getFolder = wrapAsyncWorker(getByIdAction,
  (id: FolderId) => getByFolderId(id))

export const getChildren = wrapAsyncWorker(getChildrenAction,
  (params: GetChildrenParams) => findByParent(params))
