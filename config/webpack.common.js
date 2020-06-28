const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const AddAssetWebpackPlugin = require('add-asset-html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const chalk = require('chalk');
const webpack = require('webpack');
const merge = require('webpack-merge');

const prodConfig = require('./webpack.prod.js');
const devConfig = require('./webpack.dev.js');

const path = require('path');
const fs = require('fs');

const smp = new SpeedMeasurePlugin();

const plugins = [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    title: "react webpack",
    template: "src/index.html"
  }),
  new ProgressBarPlugin({
    format: 'build [:bar]' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
    clear: false,
    width: '60',
  }),
]

const dllFiles = fs.readdirSync(path.resolve(__dirname, '..', 'dll'));
dllFiles.forEach(file => {
  if (/.*\.dll.js/.test(file)) {
    plugins.push(new AddAssetWebpackPlugin({
      filepath: path.resolve(__dirname, "..", "dll", file)
    }))
  }

  if (/.*\.manifest.js/.test(file)) {
    plugins.push(new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, "..", "dll", file)
    }))
  }
})

plugins.push(new ProgressBarPlugin({
  format:
    '  build [:bar] ' +
    chalk.green.bold(':percent') +
    ' (:elapsed seconds)',
  clear: false,
  width: '60',
}),)

const commonConfig = smp.wrap({
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
    extensions: ['.js', '.jsx'],
    mainFiles: ['index'],
    alias: {
      "@": path.resolve(__dirname, ".."),
      "@src": path.resolve(__dirname, "..", "src"),
      "@pages": path.resolve(__dirname, "..", "src/pages")
    },
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
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
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash:5].min.[ext]',
              outputPath: 'fonts/',
              publicPath: 'fonts/'
            }
          }
        ]
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
})

module.exports = (env) => {
  if (env && env.production) {
    return merge(commonConfig, prodConfig)
  } else {
    return merge(commonConfig, devConfig)
  }
}