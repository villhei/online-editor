/// <reference types="webpack-env" />

// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

// import socket from "./socket"

import MainContainer from 'containers/Main'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { history } from 'reducers/router'

import { store } from './reducer'

const APP_ROOT: string = 'main'

function render(Main: React.ComponentClass<any>) {
  const main: HTMLElement = document.getElementById(APP_ROOT) as HTMLElement
  const reactApplication: JSX.Element = (
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Main />
        </ConnectedRouter>
      </Provider>
    </AppContainer>)
  return ReactDOM.render(reactApplication, main)

}
render(MainContainer)

if (module.hot) {
  console.log('** HMR triggered for ' + module)
  module.hot.accept('./containers/Main', () => {
    const Next = require('./containers/Main').default
    render(Next)
  })
}
