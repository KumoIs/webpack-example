const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    vendorsDll: ['@babel/polyfill', 'chalk', 'qs', 'dayjs', 'core-js', 'axios'],
    antdDll: ['antd'],
    antVX6: ['@antv/x6'],
    antV7Dll: ['@antv/l7', '@antv/l7-maps'],
    reactDll: [
      'react',
      'react-dom',
      '@loadable/component',
      'react-router-dom',
      'react-router',
      'immer',
      'use-immer',
      'redux',
      'react-redux',
      'styled-components',
    ],
  },
  output: {
    filename: '[name].dll.js',
    path: path.resolve(__dirname, '..', 'dll'),
    library: '[name]',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      name: '[name]',
      path: path.resolve(__dirname, '..', 'dll/[name].manifest.js'),
    }),
  ],
};
