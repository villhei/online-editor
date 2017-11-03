import { createStore, combineReducers, applyMiddleware, Reducer } from 'redux'
import { routerReducer, routerMiddleware, push, RouterState } from 'react-router-redux'
import promiseMiddleware from 'redux-promise-middleware'
import createBrowserHistory from 'history/createBrowserHistory'

import documentReducer, { DocumentReducerState } from 'reducers/documents'

export const routerHistory = createBrowserHistory()

const reactRouterMiddleware = routerMiddleware(routerHistory)

export type RootState = {
  router: RouterState,
  documents: DocumentReducerState
}

export const rootReducer: Reducer<RootState> = combineReducers({
  router: routerReducer,
  documents: documentReducer
})

export const store = createStore(rootReducer, applyMiddleware(reactRouterMiddleware, promiseMiddleware()))