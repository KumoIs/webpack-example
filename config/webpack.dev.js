// 开发环境
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common')

const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',  //
  devServer: {
    contentBase: path.join(__dirname, 'dist'),  // 指定需要启动服务的webpack打包过后的文件
    compress: true,                  // 压缩代码
    open: true,                      // 编译后自动启动游览器
    port: 9001,                      // 启东时端口号
    hot: true,                       // 修改源码保存，不刷新游览器
    hotOnly: true                    // 即使更改代码没有生效也不刷新游览器
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 启动HMR
  ],
  optimization: {
    usedExports: true,
  },
}

module.exports = merge(commonConfig, devConfig);