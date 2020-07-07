const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: './dist',
    port: '9004',
    open: true,
    host: '0.0.0.0',
    hot: true,
    hotOnly: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    filename: "[name].js",
    chunkFilename: "[name].chunk.js",
    path: path.resolve(__dirname, '..', 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(c|le)ss$/i,
        use: [
          'style-loader',
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
            }
          },
          'postcss-loader',
          'less-loader'
        ]
      },
    ]
  }
}