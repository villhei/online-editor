/// <reference types="webpack-env" />

import MainContainer from 'containers/Main'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { history } from 'reducers/router'

import { store } from './reducer'

const APP_ROOT: string = 'main'

function render(Main: new () => React.Component<{}, {}>) {
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
// tslint:disable:next-line no-any
render(MainContainer as any)

if (module.hot) {
  console.log('** HMR triggered for ' + module)
  module.hot.accept('./containers/Main', () => {
    const next = require('./containers/Main').default
    render(next)
  })
}
