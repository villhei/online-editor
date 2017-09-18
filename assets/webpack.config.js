const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WebpackShellPlugin = require('webpack-shell-plugin')

const config = {
  entry: ['./css/app.css', './src/app.js'],
  output: {
    path: path.resolve(__dirname, '../priv/static'),
    filename: 'src/app.js'
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
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader:
        'source-map-loader'
      },
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      }
    ]
  },
  plugins: [
    new WebpackShellPlugin({onBuildStart: ['npm run fix-style'], onBuildEnd: ['echo "Webpack End"']}),
    new ExtractTextPlugin('css/app.css'),
    new CopyWebpackPlugin([{ from: './static/' }])
  ]
}

module.exports = config
