import { combineReducers } from 'redux'
import createBrowserHistory from 'history/createBrowserHistory'
import { routerReducer } from 'react-router-redux'

export const history = createBrowserHistory()

export const router = routerReducer