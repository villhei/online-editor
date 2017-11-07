import { createStore, combineReducers, applyMiddleware, Reducer } from 'redux'
import { routerReducer, routerMiddleware, RouterState } from 'react-router-redux'
import promiseMiddleware from 'redux-promise-middleware'

import documentReducer, { DocumentReducerState } from 'reducers/documents'
import { history, router } from 'reducers/router'
import pageReducer, { PageState } from 'reducers/page'

const reactRouterMiddleware = routerMiddleware(history)

export type RootState = {
  ui: {
    router: RouterState,
    page: PageState
  },
  model: {
    documents: DocumentReducerState
  }
}

export const rootReducer: Reducer<RootState> = combineReducers({
  ui: combineReducers({
    router,
    page: pageReducer
  }),
  model: combineReducers({
    documents: documentReducer
  })
})

export const store = createStore(rootReducer, applyMiddleware(reactRouterMiddleware, promiseMiddleware()))