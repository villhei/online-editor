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

import editorReducer, { EditorState } from 'reducers/editor'
import errorReducer, { ErrorState } from 'reducers/error'
import pageReducer, { PageState } from 'reducers/page'
import { history, router } from 'reducers/router'
import { Map } from 'service/common'

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

export const rootReducer: Reducer<RootState> = combineReducers({
  ui: combineReducers({
    router,
    page: pageReducer
  }),
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
