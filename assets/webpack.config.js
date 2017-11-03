const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const RewriteImportPlugin = require('less-plugin-rewrite-import')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const WriteFilePlugin = require('write-file-webpack-plugin')

const PUBLIC_PATH = 'http://localhost:4001/'

const env = process.env.MIX_ENV || 'dev'
const isDev = env === 'dev'

function sourcePath (subDir) {
  return path.join(__dirname, 'src', subDir)
}

function getPlugins () {
  const plugins = [
    new ExtractTextPlugin('css/app.css'),
    new CopyWebpackPlugin([{ from: './static/' }]),
    new WriteFilePlugin(),
    new HtmlWebpackPlugin({
      title: 'Online editor',
      template: 'index.ejs',
      filename: 'index.html',
      inject: false
    })
  ]
  if (!isDev) {
    return plugins
  } else {
    return plugins.concat(new webpack.NamedModulesPlugin(), new webpack.HotModuleReplacementPlugin())
  }
}

const lessLoader = {
  loader: 'less-loader', // compiles Less to CSS
  options: {
    paths: [path.resolve(__dirname), path.resolve(__dirname, 'node_modules')],
    plugins: [
      new RewriteImportPlugin({
        paths: {
          '../../theme.config': path.join(__dirname, '/styles/semantic-ui/theme.config')
        }
      })
    ]
  }
}

const entryPoints = ['react-hot-loader/patch', './styles/app.less', './src/app.tsx']
const config = {
  entry: isDev ? [
    'webpack-dev-server/client?' + PUBLIC_PATH,
    'webpack/hot/only-dev-server'].concat(entryPoints) : entryPoints,
  output: {
    path: path.resolve(__dirname, '../priv/static'),
    filename: 'js/app.js',
    publicPath: '/'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: ['deps', 'node_modules'],
    alias: {
      actions: sourcePath('actions'),
      constants: sourcePath('constants'),
      containers: sourcePath('containers'),
      service: sourcePath('service'),
      mocks: sourcePath('mocks'),
      reducers: sourcePath('reducers')
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['react-hot-loader/webpack', 'awesome-typescript-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader'
          }, {
            loader: 'resolve-url-loader'
          },
            lessLoader
          ]
        })
      },
      {
        enforce: 'pre',
        test: /\.js?$/,
        loader:
        'source-map-loader'
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$/,
        use: 'file-loader?name=[name].[ext]?[hash]'
      },
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      }
    ]
  },
  plugins: getPlugins()
}

module.exports = config
