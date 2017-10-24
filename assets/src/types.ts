import { PROMISE_STATUS_PENDING, PROMISE_STATUS_READY, PROMISE_STATUS_FAILURE } from './constants/promise'

export type ReduxAction = {
  type: string
  data: any
}

export type AsyncStatus = typeof PROMISE_STATUS_PENDING | typeof PROMISE_STATUS_READY | typeof PROMISE_STATUS_FAILURE

export type PromiseAction = {
  type: string,
  status: AsyncStatus,
  promise: Promise<any>,
  data: any
}