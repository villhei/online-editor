import { createStore, combineReducers, applyMiddleware } from 'redux'
import { routerReducer, routerMiddleware, push } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

export const routerHistory = createHistory()

const reactRouterMiddleware = routerMiddleware(routerHistory)

export const rootReducer = combineReducers({
  router: routerReducer
})

export const store = createStore(rootReducer, applyMiddleware(reactRouterMiddleware))