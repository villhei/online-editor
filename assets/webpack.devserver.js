#!/usr/bin/env node
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.config.dev')

new WebpackDevServer(webpack(config), {
  proxy: { '*': 'http://localhost:4040' },
  historyApiFallback: true,
  hot: true,
  inline: true
}).listen(4001, '0.0.0.0', function (err, result) {
  if (err) console.error(err)
  console.log('webpack-dev-server running on port 4001')
})

// Exit on end of STDIN
process.stdin.resume()
process.stdin.on('end', function () {
  process.exit(0)
})
