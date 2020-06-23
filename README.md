> 从零搭建一个 webpack 通用到环境。

# 一、安装 webpack
`yarn init -y`
`yarn add webpack webpack-cli` 安装 webpack

# 二、 配置 项目结构
> 创建 .gitignore(git 配置不需要上传到文件) src(创建index.js) config(config下分别创建 webpack.(dev | prod | common).js 三个文件)
> 主要配置 入口文件 输出文件 以及 开发模式。
```javascript
const path = require('path');

module.exports = {
  mode: 'development',
  entry: '../src/index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '..', 'dist'),
  },
}
```

# 三、 配置 webpack loader
> 我自己到话 是先统一在 webpack.common.js 配置完毕以后在分开配置生产和线上到配置文件。 除了配置基本到 出口 入口 后，就先从 loader 开始
> 安装常用 loader `yarn add -D style-loader css-loader less-loader postcss-loader url-loader file-loader csv-loader xml-loader`。
> 在 index.js 增加一些简单的逻辑(比如创建节点), 引入 iconfont (这块不做赘述自行查看项目代码), 图片和 xml 来进行测试，还修改了入口文件的配置以及新增 module。
```javascript
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    main: '../src/index.js'
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, '..', 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(c|le)ss$/,
        use: [
          'style-loader',
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
            }
          },
          'less-loader',
          'postcss-loader',
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[name]_[hash].[ext]',
              outputPath: 'images/'
            },
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name]_[hash].[ext]',
          outputPath: 'fonts/'
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
```

四、 配置 webpack plugins
> 配置 plugins 主要有 抽离css让它不会被webpack打包到输出文件里、打包生成html、打包时自动删除dist(下面会按这些描述插件的顺序来进行安装)、 自动增加兼容css前缀；
> `yarn add -D mini-css-extract-plugin html-webpack-plugin clean-webpack-plugin autoprefixer`
> 修改输出文件的配置， 增加了 plugins 配置，新增文件 postcss.config.js
```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js'
  },
  output: {
    filename: "[name].[contenthash].js",
    chunkFilename: "[name].[contenthash].chunk,js",
    path: path.resolve(__dirname, '..', 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "react webpack",
      template: "src/index.html"
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[name].[contenthash].chunk.css'
    }),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(s|le)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
            }
          },
          'less-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[name]_[hash].[ext]',
              outputPath: 'images/'
            },
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name]_[hash].[ext]',
          outputPath: 'fonts/'
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
```
```javascript
// postcss.config.js
module.exports = {
  plugins: [
    require('autoprefixer')({
      overrideBrowserslist: ['last 15 versions'] // 表示要兼容游览器的版本，必须设置否则会不生效
    })
  ]
};
```