import { ReduxAction, PromiseAction } from '../types'
import { ACTION_GET_FILE } from '../constants/file'

import { getFileByName } from '../service/file-service'
export function createFileFetchAction(fileName: string): ReduxAction {
  return {
    type: ACTION_GET_FILE,
    data: getFileByName(fileName)

  }
}

export function fetchFile(fileName: string) {

}
