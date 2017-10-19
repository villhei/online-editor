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

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Main from './containers/Main'

const APP_ROOT: string = 'main'

function doRender(Main: React.ComponentClass<any>) {
  const main: HTMLElement = document.getElementById(APP_ROOT) as HTMLElement
  ReactDOM.render(
    <AppContainer>
      <Main />
    </AppContainer>
    , main)

}
doRender(Main)

if (module.hot) {
  console.log('hot modules')
  module.hot.accept('./containers/Main', () => {
    const Next = require('./containers/Main').default
    doRender(Next)
  })
}
