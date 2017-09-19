// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import 'phoenix_html'

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

// import socket from "./socket"

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Main from './containers/Main'

const APP_ROOT: string = 'main'

export default function render (node: HTMLElement): void {
  ReactDOM.render(<Main />, node)
}

const main: HTMLElement | null = document.getElementById(APP_ROOT)
if (main) {
  render(main)
} else {
  console.error(`Error element '${APP_ROOT}' not found`)
}
