const path = require('path');

module.exports = {
  mode: 'development', // 默认为 production 生产环境 production(压缩代码) |  development(不会压缩代码)
  entry: './src/index.js', // 打包指定的入口文件
  output: {            // 打包输出到指定的文件
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [                // 规则 数组 说明可以接受多个规则
      {
        test: /\.(png|jpg|gif)$/,     // 以该规则，要打包那些文件 (以jpg结尾的文件)
        use: {             
          loader: 'url-loader',
          options: {
            // placeholder 占位符
            name: '[name]__[hash].[ext]',
            outputPath: 'assets/',  // 打包以后 图片 打包的地址
            limit: 10240 // 图片小于设定的大小时，就才用打包成base64 否则打包成图片在 outputPath 指定的地址 
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',  // 从下到上 自右到左
        ]
      },
      // {
      //   test: /\.html$/,
      //   use: ['html-loader']
      // }
    ]
  }
}