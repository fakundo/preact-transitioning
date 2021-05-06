const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, 'examples/index'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'docs'),
    publicPath: '',
  },
  target: 'web',
  mode: 'production',
  devtool: 'source-map',
  stats: 'errors-only',
  plugins: [
    new HtmlWebpackPlugin(),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias: {
      'preact-transitioning': path.resolve(__dirname),
    },
  },
}
