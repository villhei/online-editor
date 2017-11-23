const webpack = require('webpack')
const merge = require('webpack-merge')

const baseConfig = require('./webpack.config.base')

const PUBLIC_PATH = 'http://localhost:4001/'

module.exports = merge.strategy({
  entry: 'prepend'
})(baseConfig, {
  devtool: 'source-map',
  entry: [
    'webpack-dev-server/client?' + PUBLIC_PATH,
    'react-hot-loader/patch',
    'webpack/hot/only-dev-server'
  ],
  plugins: [
    new webpack.NamedModulesPlugin(), new webpack.HotModuleReplacementPlugin()
  ]
})
