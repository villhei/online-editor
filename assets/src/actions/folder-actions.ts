import actionCreatorFactory from 'typescript-fsa'
import { wrapAsyncWorker } from './async'

import {
  Folder,
  getRoot
} from 'service/folder-service'

export const ACTION_GET_ROOT_DIRECTORY = 'ACTION_GET_ROOT_DIRECTORY'

const actionCreator = actionCreatorFactory()

export const getRootAction = actionCreator
  .async<undefined, Folder, {}>(ACTION_GET_ROOT_DIRECTORY)

export const getRootFolder = wrapAsyncWorker(getRootAction, getRoot)