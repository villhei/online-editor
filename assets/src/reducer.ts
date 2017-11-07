import { createStore, combineReducers, applyMiddleware, Reducer } from 'redux'
import { routerReducer, routerMiddleware, RouterState } from 'react-router-redux'
import promiseMiddleware from 'redux-promise-middleware'

import documentReducer, { DocumentReducerState } from 'reducers/documents'
import { history, router } from 'reducers/ui'
const reactRouterMiddleware = routerMiddleware(history)

export type RootState = {
  ui: {
    router: RouterState,
  },
  model: {
    documents: DocumentReducerState
  }
}

export const rootReducer: Reducer<RootState> = combineReducers({
  ui: combineReducers({
    router
  }),
  model: combineReducers({
    documents: documentReducer
  })
})

export const store = createStore(rootReducer, applyMiddleware(reactRouterMiddleware, promiseMiddleware()))