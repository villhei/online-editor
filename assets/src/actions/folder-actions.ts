import actionCreatorFactory from 'typescript-fsa'
import { wrapAsyncWorker } from './async'

import {
  Folder,
  FolderId,
  getRoot,
  findByParent
} from 'service/folder-service'

export const ACTION_GET_ROOT_DIRECTORY = 'ACTION_GET_ROOT_DIRECTORY'
export const ACTION_GET_CHILDREN = 'ACTION_GET_CHILDREN'

export type GetChildrenParams = FolderId
const actionCreator = actionCreatorFactory()

export const getRootAction = actionCreator
  .async<undefined, Folder, {}>(ACTION_GET_ROOT_DIRECTORY)


export const getChildrenAction = actionCreator
  .async<GetChildrenParams, Array<Folder>, {}>(ACTION_GET_CHILDREN)

export const getRootFolder = wrapAsyncWorker(getRootAction, getRoot)

export const getChildren = wrapAsyncWorker(getChildrenAction,
  (params: GetChildrenParams) => findByParent(params))