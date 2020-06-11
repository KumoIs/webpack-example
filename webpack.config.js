// plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',               // 默认为 production 生产环境 production(压缩代码) |  development(不会压缩代码)
  entry: {
    main: './src/index.js'
  },                                 // 打包指定的入口文件, 可以配置多个
  devServer: {
    contentBase: path.join(__dirname, 'dist'),  // 指定需要启动服务的webpack打包过后的文件
    compress: true,                  // 压缩代码
    open: true,                      // 编译后自动启动游览器
    port: 9001,                      // 启东时端口号
    hot: true,                       // 修改源码保存，不刷新游览器
    hotOnly: true                    // 即使更改代码没有生效也不刷新游览器
  },
  output: {                          // 打包输出到指定的文件
    publicPath: "/",                 // 所有打包文件引入地址都以根路径开头
    filename: 'dist.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),                               // 打包 html 文件
    new CleanWebpackPlugin(),         // 自动删除旧当打包文件
    new webpack.HotModuleReplacementPlugin(), // 启动HMR
  ],
  optimization: {
    usedExports: true,
  },
  module: {
    rules: [                          // 规则 数组 说明可以接受多个规则
      {
        test: /\.(png|jpg|gif)$/,     // 以该正则匹配制定，执行配置当 use.loader 当规则来打包
        use: {
          loader: 'url-loader',       // 让 webpack 以 url-loader 来处理图片文件
          options: {
            // placeholder 占位符
            name: '[name]__[hash].[ext]', // name： 文件名，hash：文件打包后到唯一值，ext：文件后缀
            outputPath: 'assets/',    // 将文件打包到制定文件夹中
            limit: 10240              // 图片小于设定的大小时，才打包成base64，否则将文件打包到 outputPath 指定的地址
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'font/'
          }
        }
      },
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              // modules: true
            }
          },
          'postcss-loader',
          'sass-loader',  // 从下到上 自右到左
        ]
      },
    ]
  }
}