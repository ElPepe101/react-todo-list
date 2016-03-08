var webpack = require('webpack')
var CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
  debug: true,
  devtool: 'source-map',
  entry: './src/main.jsx',
  output: {
    path: __dirname + '/dist/public',
    publicPath: '/public/',
    filename: 'main.min.js'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  resolve: {
    fallback: [__dirname + '/src/components']
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new CompressionPlugin(
      {
        asset: '{file}.gz',
        algorithm: 'gzip',
        test: /\.js$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
      })
  ]
}
