const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const resolve = require('path').resolve;

module.exports = {
  mode: 'production',
  devtool: 'nosources-source-map',
  output: {
    filename: "[name].[contenthash].js",
    chunkFilename: "[name].[contenthash].chunk.js",
    path: resolve(__dirname, '..', 'dist'),
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style/[name].[contenthash].css',
      chunkFilename: 'style/[name].[contenthash].chunk.css'
    }),
    new OptimizeCssAssetsWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
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
