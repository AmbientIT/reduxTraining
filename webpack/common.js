const { DefinePlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ENV = require('yargs').argv.env || 'development'

module.exports = { //eslint-disable-line
  resolve: {
    extensions: ['.jsx', '.js', '.json'],
    modules: ['node_modules'],
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx|.js$/,
        exclude: /node_modules/,
        loaders: ['eslint-loader', 'source-map-loader'],
      },
      {
        test: /\.jsx|.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: [['es2015', { modules: false }], 'stage-0', 'react'],
          plugins: ['transform-decorators-legacy', 'react-hot-loader/babel'],
        },
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loader: 'file',
        query: {
          name: 'img/[hash:6].[ext]',
        },
      },
      {
        test: /\.woff2?$/,
        loader: 'url',
        query: {
          name: 'fonts/[name].[ext]',
          limit: 10000,
          mimetype: 'application/font-woff',
        },
      },
      {
        test: /\.(ttf|eot)$/,
        loader: 'file',
        query: {
          name: 'fonts/[name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new DefinePlugin({
      'process.env': {
        NODE_ENV: `'${ENV}'`,
      },
    }),
    new HtmlWebpackPlugin({
      template: `${process.cwd()}/src/index.html`,
      inject: 'body',
    }),
  ],
}
