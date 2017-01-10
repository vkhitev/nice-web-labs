const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: {
    lab3: './public/src/lab3.js',
    lab4: './public/src/lab4.js',
    lab5: './public/src/lab5.js',
    lab6: './public/src/lab6.js',
    lab7: './public/src/lab7.js'
  },
  output: {
    path: path.resolve(__dirname, 'public/bin'),
    filename: '[name].js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    })
  ]
}
