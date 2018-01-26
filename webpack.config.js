const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

module.exports = {
  context: path.join(__dirname, 'public', 'app'),
  entry: {
    app: './App.js'
  },
  output: {
    filename: 'public/build/[name].bundle.js',
    sourceMapFilename: 'public/build/[name].bundle.map'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react','es2015'],
          plugins: ['transform-object-rest-spread']
        }
      }
    ]
  }
}