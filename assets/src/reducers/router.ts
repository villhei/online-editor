import createBrowserHistory from 'history/createBrowserHistory'
import { RouterState, routerReducer } from 'react-router-redux'
import { Reducer } from 'redux'

export const history = createBrowserHistory()

export const router = routerReducer as Reducer<RouterState>
