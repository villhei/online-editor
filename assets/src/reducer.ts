import { createStore, combineReducers, applyMiddleware, Reducer } from 'redux'
import { routerReducer, routerMiddleware, RouterState } from 'react-router-redux'
import promiseMiddleware from 'redux-promise-middleware'

import documentReducer, { DocumentReducerState } from 'reducers/documents'
import { history, router } from 'reducers/router'
import pageReducer, { PageState } from 'reducers/page'
import editorReducer, { EditorState } from 'reducers/editor'

const reactRouterMiddleware = routerMiddleware(history)

export type RootState = {
  ui: {
    router: RouterState,
    page: PageState
  },
  model: {
    documents: DocumentReducerState
  },
  state: {
    editor: EditorState
  }
}

export const rootReducer: Reducer<RootState> = combineReducers({
  ui: combineReducers({
    router,
    page: pageReducer
  }),
  model: combineReducers({
    documents: documentReducer
  }),
  state: combineReducers({
    editor: editorReducer
  })
})

export const store = createStore(rootReducer, applyMiddleware(reactRouterMiddleware, promiseMiddleware()))