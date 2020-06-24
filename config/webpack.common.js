const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const merge = require('webpack-merge');

const prodConfig = require('./webpack.prod.js');
const devConfig = require('./webpack.dev.js');

const resolve = require('path').resolve;

const commonConfig = {
  entry: {
    main: './src/index.js'
  },
  optimization: {
    usedExports: true,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
           test: /[\\/]node_modules[\\/]/,
           filename: '[name].[contenthash].js',
        },
      }
    },
  },
  resolve: {
    extensions: ['.js', '.tsx', '.ts'],
    alias: {
      '@': resolve('src'),
      utils: resolve('src/utils'),
      pages: resolve('src/pages'),
      components: resolve('src/components'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "react webpack",
      template: "src/index.html"
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        include: resolve(__dirname, 'src'),
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10 * 1024,
              name: '[name].[hash:5].[ext]',
              outputPath: 'images/'
            },
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[hash:5].min.[ext]',
          outputPath: 'fonts/',
          publicPath: 'fonts/'
        }
      },
      {
        test: /\.(csv|tsv)$/,
        use: [
          'csv-loader',
        ],
      },
      {
        test: /\.xml$/,
        use: [
          'xml-loader',
        ],
      },
    ]
  }
}

module.exports = (env) => {
  if (env && env.production) {
    return merge(commonConfig, prodConfig)
  }

  merge(commonConfig, devConfig)
}