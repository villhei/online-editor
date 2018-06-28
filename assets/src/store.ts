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

import autoSaveMiddleware from 'middleware/autosave'
import editorReducer, { EditorState } from 'reducers/editor'
import errorReducer, { ErrorState } from 'reducers/error'
import pageReducer, { PageState } from 'reducers/page'
import userReducer, { UserState } from 'reducers/user'

import { history, router } from 'reducers/router'

const reactRouterMiddleware = routerMiddleware(history)

export interface RootState {
  model: {
    folders: FolderState,
    documents: DocumentReducerState,
    user: UserState
  },
  ui: {
    router: RouterState,
    page: PageState
    editor: EditorState,
    error: ErrorState
  }
}

export interface RouterProvidedProps {
  match: {
    path: string,
    url: string,
    params: Map<string>,
    isExact: boolean
  }
}

export const rootReducer: Reducer<RootState> = combineReducers({
  model: combineReducers({
    folders: folderReducer,
    documents: documentReducer,
    user: userReducer
  }),
  ui: combineReducers({
    editor: editorReducer,
    error: errorReducer,
    router,
    page: pageReducer
  })
})

export const store = createStore(rootReducer, applyMiddleware(reactRouterMiddleware, thunk, autoSaveMiddleware))
