const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware'); // 中间件： 顾名思义当你要做一些什么事情时先只想这个中间件
const config = require('./config/webpack.config');
const compiler = webpack(config); // 当你每次允许时会重新打包编译

const app = express();

// 当你编译时为了确保路径不会出现问题，这里使用了 webpack.config 中 output.publicPath 确保每个引入路径都是从根目录下访问
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}))

app.listen(8099, () => {
    console.log('测试链接通过。。。')
})