import { AsyncActionCreators } from 'typescript-fsa'
import { Dispatch } from 'redux'

export function wrapAsyncWorker<P, S, E>(
  asyncAction: AsyncActionCreators<P, S, E>,
  worker: (params: P) => Promise<S>
) {
  return function wrappedWorker(dispatch: Dispatch<S>, params: P): Promise<S> {
    dispatch(asyncAction.started(params))
    return worker(params).then(result => {
      dispatch(asyncAction.done({ params, result }))
      return result
    }, error => {
      dispatch(asyncAction.failed({ params, error }))
      throw error
    });
  }
}

