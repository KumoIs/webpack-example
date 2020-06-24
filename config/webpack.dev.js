const resolve = require('path').resolve;
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  devtool: 'inline-cheap-module-source-map',
  devServer: {
    contentBase: './dist',
    port: '9001',
    open: true,
    host: '0.0.0.0',
    hot: true,
    hotOnly: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  entry: {
    main: './src/index.js'
  },
  output: {
    filename: "[name].js",
    chunkFilename: "[name].chunk.js",
    path: resolve(__dirname, '..', 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
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