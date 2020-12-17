const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    vendorsDll: ['@babel/polyfill', 'chalk', 'qs', 'antd', 'dayjs'],
    reactDll: ['react', 'react-dom', '@loadable/component', 'react-router-dom', 'react-router', 'use-immer'],
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
