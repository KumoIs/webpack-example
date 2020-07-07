const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const AddAssetWebpackPlugin = require('add-asset-html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const chalk = require('chalk');
const webpack = require('webpack');
const merge = require('webpack-merge');

const prodConfig = require('./webpack.prod.js');
const devConfig = require('./webpack.dev.js');

const path = require('path');
const fs = require('fs');

const plugins = [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    title: "react webpack",
    template: "src/index.html",
    minify: {
      removeAttributeQuotes: true, //压缩 去掉引号
    },
  }),
  new ProgressBarPlugin({
    format: 'build [:bar]' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
    clear: false,
    width: '60',
  }),
  new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    openAnalyzer: false,
    logLevel: 'info'
  })
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
          filename: 'vendor.[contenthash].js',
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
      "@pages": path.resolve(__dirname, "..", "src/pages"),
      "@store": path.resolve(__dirname, "..", "src/store"),
    },
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "thread-loader",
            // 有同样配置的 loader 会共享一个 worker 池(worker pool)
            options: {
              // 产生的 worker 的数量，默认是 cpu 的核心数
              workers: 2,

              // 一个 worker 进程中并行执行工作的数量
              // 默认为 20
              workerParallelJobs: 50,

              // 闲置时定时删除 worker 进程
              // 默认为 500ms
              // 可以设置为无穷大， 这样在监视模式(--watch)下可以保持 worker 持续存在
              poolTimeout: 2000,

              // 池(pool)分配给 worker 的工作数量
              // 默认为 200
              // 降低这个数值会降低总体的效率，但是会提升工作分布更均一
              poolParallelJobs: 50,

              // 池(pool)的名称
              // 可以修改名称来创建其余选项都一样的池(pool)
              name: "my-pool"
            }
          },
          'babel-loader'
        ]
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
}

module.exports = () => {
  if (process.env.NODE_ENV === 'production') {
    return merge(commonConfig, prodConfig)
  } else {
    return merge(commonConfig, devConfig)
  }
}