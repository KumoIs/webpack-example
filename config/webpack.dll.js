const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    reactDll: ['react', 'react-dom','react-router-dom', '@loadable/component' ],
    reduxDll: ['redux', 'react-redux', 'redux-logger', 'redux-thunk'],
    vendorsDll: ['@babel/polyfill', 'chalk'],
  },
  output: {
    filename: "[name].dll.js",
    path: path.resolve(__dirname, "..", "dll"),
    library: "[name]"
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      name: "[name]",
      path: path.resolve(__dirname, "..", "dll/[name].manifest.js"),
    })
  ]
}