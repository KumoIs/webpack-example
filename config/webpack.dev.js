const path = require('path');
const webpack = require('webpack');
const proxy = require('./proxy');

module.exports = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    contentBase: './dist',
    port: '9004',
    open: true,
    host: 'localhost',
    hot: true,
    hotOnly: true,
    overlay: true,
    proxy,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].chunk.js',
    path: path.resolve(__dirname, '..', 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(c|le)ss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {},
          },
        ],
      },
    ],
  },
};
