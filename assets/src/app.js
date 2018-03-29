"use strict";
///<reference types="webpack-env" />
exports.__esModule = true;
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
var React = require("react");
var ReactDOM = require("react-dom");
var react_redux_1 = require("react-redux");
var react_router_redux_1 = require("react-router-redux");
var react_hot_loader_1 = require("react-hot-loader");
var Main_1 = require("containers/Main");
var reducer_1 = require("./reducer");
var router_1 = require("reducers/router");
var APP_ROOT = 'main';
function render(Main) {
    var main = document.getElementById(APP_ROOT);
    var reactApplication = (React.createElement(react_hot_loader_1.AppContainer, null,
        React.createElement(react_redux_1.Provider, { store: reducer_1.store },
            React.createElement(react_router_redux_1.ConnectedRouter, { history: router_1.history },
                React.createElement(Main, null)))));
    return ReactDOM.render(reactApplication, main);
}
render(Main_1["default"]);
if (module.hot) {
    console.log('** HMR triggered for ' + module);
    module.hot.accept('./containers/Main', function () {
        var Next = require('./containers/Main')["default"];
        render(Next);
    });
}
