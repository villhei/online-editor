const baseConfig = require('./webpack.config.base')
const merge = require('webpack-merge')
const path = require('path')

const CleanWebpackPlugin = require('clean-webpack-plugin')
const Uglify = require('uglifyjs-webpack-plugin')

module.exports = merge(baseConfig, {
  plugins: [
    new CleanWebpackPlugin(['/priv/static'], {
      root: path.join(__dirname, '..')
    }),
    new Uglify()
  ]
})
