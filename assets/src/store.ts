import {
  RouterState,
  routerMiddleware
} from 'react-router-redux'
import documentReducer, {
  DocumentReducerState
} from 'reducers/documents'
import folderReducer, {
  FolderState
} from 'reducers/folder'
import {
  Reducer,
  applyMiddleware,
  combineReducers,
  createStore
} from 'redux'

import thunk from 'redux-thunk'

import { Map } from 'library/service/common'
import editorReducer, { EditorState } from 'reducers/editor'
import errorReducer, { ErrorState } from 'reducers/error'
import pageReducer, { PageState } from 'reducers/page'
import { history, router } from 'reducers/router'

const reactRouterMiddleware = routerMiddleware(history)

export type RootState = {
  ui: {
    router: RouterState,
    page: PageState
  },
  model: {
    folders: FolderState,
    documents: DocumentReducerState
  },
  state: {
    editor: EditorState,
    error: ErrorState
  }
}

export type RouterProvidedProps = {
  match: {
    path: string,
    url: string,
    params: Map<string>,
    isExact: boolean
  }
}

const ui: Reducer<{
  router: RouterState,
  page: PageState
}> = combineReducers({
  router,
  page: pageReducer
})

export const rootReducer: Reducer<RootState> = combineReducers({
  ui,
  model: combineReducers({
    folders: folderReducer,
    documents: documentReducer
  }),
  state: combineReducers({
    editor: editorReducer,
    error: errorReducer
  })
})

export const store = createStore(rootReducer, applyMiddleware(reactRouterMiddleware, thunk))
