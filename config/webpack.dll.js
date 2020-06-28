const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    react: ['react', 'react-dom','react-router-dom', '@loadable/component' ]
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