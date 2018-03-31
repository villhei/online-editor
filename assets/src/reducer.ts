import { createStore, combineReducers, applyMiddleware, Reducer } from 'redux'
import { routerMiddleware, RouterState } from 'react-router-redux'
import thunk from 'redux-thunk'
import documentReducer, { DocumentReducerState } from 'reducers/documents'
import { history, router } from 'reducers/router'
import pageReducer, { PageState } from 'reducers/page'
import editorReducer, { EditorState } from 'reducers/editor'
import errorReducer, { ErrorState } from 'reducers/error'

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
    editor: EditorState,
    error: ErrorState
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
    editor: editorReducer,
    error: errorReducer
  })
})

export const store = createStore(rootReducer, applyMiddleware(reactRouterMiddleware, thunk))
