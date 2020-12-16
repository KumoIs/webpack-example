const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const AddAssetWebpackPlugin = require('add-asset-html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const chalk = require('chalk');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const threadLoader = require('thread-loader');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

threadLoader.warmup({}, ['babel-loader', 'css-loader', 'less-loader']);

const path = require('path');
const fs = require('fs');
const prodConfig = require('./webpack.prod.js');
const devConfig = require('./webpack.dev.js');

console.log(path.resolve(__dirname, '..'));
const plugins = [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    title: 'webpack架构',
    template: 'src/index.html',
    filename: 'index.html',
    minify: {
      removeAttributeQuotes: true, // 压缩 去掉引号
    },
  }),
  new ProgressBarPlugin({
    format: `build [:bar]${chalk.green.bold(':percent')} (:elapsed seconds)`,
    clear: false,
    width: '60',
  }),
  new BundleAnalyzerPlugin({
    openAnalyzer: false,
    logLevel: 'info',
    analyzerMode: 'server',
    analyzerHost: '127.0.0.1',
    analyzerPort: 1271,
  }),
  new HardSourceWebpackPlugin(),
  new AntdDayjsWebpackPlugin(),
];

const dllFiles = fs.readdirSync(path.resolve(__dirname, '..', 'dll'));
dllFiles.forEach((file) => {
  if (/.*\.dll.js/.test(file)) {
    plugins.push(
      new AddAssetWebpackPlugin({
        filepath: path.resolve(__dirname, '..', 'dll', file),
      })
    );
  }

  if (/.*\.manifest.js/.test(file)) {
    plugins.push(
      new webpack.DllReferencePlugin({
        manifest: path.resolve(__dirname, '..', 'dll', file),
      })
    );
  }
});

const commonConfig = {
  entry: {
    main: './src/index.tsx',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    mainFiles: ['index'],
    alias: {
      '@': path.resolve(__dirname, '..', 'src'),
      '@utils': path.resolve(__dirname, '..', 'src/utils'),
      '@pages': path.resolve(__dirname, '..', 'src/pages'),
      '@store': path.resolve(__dirname, '..', 'src/store'),
      '@styles': path.resolve(__dirname, '..', 'src/styles'),
      '@assets': path.resolve(__dirname, '..', 'src/assets'),
      '@components': path.resolve(__dirname, '..', 'src/components'),
    },
  },
  optimization: {
    minimizer: [
      // 代码压缩插件
      new TerserPlugin({
        test: /\.jsx?$/,
        parallel: true, // 开启并行压缩
        terserOptions: {
          // Terser 压缩配置
          output: { comments: false },
        },
        cache: true,
        extractComments: true, // 将注释剥离到单独的文件
      }),
    ],
    usedExports: true,
    runtimeChunk: {
      name: 'runtime',
    },
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          // filename: 'vendor.[contenthash].js',
        },
      },
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
            loader: 'thread-loader',
            options: {
              workers: 3,
            },
          },
          'babel-loader',
        ],
      },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader',
      },
      {
        test: /\.(gif|png|jpe?g)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10 * 1024,
              name: '[name].[hash:5].[ext]',
              outputPath: 'images/',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash:5].min.[ext]',
              outputPath: 'fonts/',
              publicPath: 'fonts/',
            },
          },
        ],
      },
      {
        test: /\.(csv|tsv)$/,
        use: ['csv-loader'],
      },
      {
        test: /\.xml$/,
        use: ['xml-loader'],
      },
    ],
  },
};

module.exports = () => {
  if (process.env.NODE_ENV === 'production') {
    return merge(commonConfig, prodConfig);
  }
  return merge(commonConfig, devConfig);
};
