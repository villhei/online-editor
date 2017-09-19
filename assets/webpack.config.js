const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WebpackShellPlugin = require('webpack-shell-plugin')
const RewriteImportPlugin = require('less-plugin-rewrite-import')

function getPlugins () {
  const plugins = [
    new ExtractTextPlugin('css/app.css'),
    new CopyWebpackPlugin([{ from: './static/' }])
  ]
  if (!process.env.SKIP_LINT) {
    return plugins.concat(new WebpackShellPlugin({ onBuildStart: ['npm run fix-style'], onBuildEnd: ['echo "Webpack End"'] }))
  }
  return plugins
}

const lessLoader = {
  loader: 'less-loader', // compiles Less to CSS
  options: {
    paths: [path.resolve(__dirname), path.resolve(__dirname, 'node_modules')],
    plugins: [
      new RewriteImportPlugin({
        paths: {
          '../../theme.config': path.join(__dirname, '/css/semantic-ui/theme.config')
        }
      })
    ]
  }
}

const config = {
  entry: ['./css/app.less', './src/app.js'],
  output: {
    path: path.resolve(__dirname, '../priv/static'),
    filename: 'js/app.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: ['deps', 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'awesome-typescript-loader']
      },
      {
        test: /\.jsx?$/,
        use: 'babel-loader'
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader'
          },
            lessLoader
          ]
        })
      },
      {
        enforce: 'pre',
        test: /\.jsx?$/,
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
