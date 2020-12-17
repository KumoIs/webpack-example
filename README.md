## 什么是 webpack 以及 安装和使用
    >webpack 是一个模块打包机，将根据文件间的依赖关系对其进行静态分析，然后将这些模块按指定规则生成静态资源当 webpack 处理程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle

* **主要承担如下功能：**
    1. 打包：将多个文件 打包成 一个文件，减少服务器压力和下载带宽
    2. 转换：将预编译语言 转换成 浏览器识别的语言
    3. 优化：性能优化

* **webpack 特点：**
    1. 代码拆分
        >webpack 有两种组织模块的依赖方式，同步、异步

        >异步依赖将作为分割点，形成一个新的块；在优化了依赖树之后，每一个异步区块都将作为一个文件被打包

    2. 智能解析
        > webpack 有一个智能解析器，几乎可以处理任何第三方库

        >无论它们的模块形式是 CommonJS、 AMD 还是普通的 JS 文件；甚至在加载依赖的时候，允许使用动态表达式 require("./templates/" + name + ".jade")

    3. 快速运行

        > webpack 使用异步 I/O 、多级缓存提高运行效率，使得 webpack 以难以令人置信的速度 快速增量编译

* **安装 webpack**
    > 项目初始化，安装 webpack
    `yarn init`
    `yarn add webpack webpack-cli`

## 核心概念：入口 entry
* **作用**
    >告诉 webpack 从哪个文件开始构建，这个文件将作为 webpack 依赖关系图的起点

* **配置 单入口**
```javascript
// webpack 配置
    module.exports = {
        entry: './src/index.tsx'
    };
```
* **配置 多入口**
```javascript
// 场景一：分离 应用程序(app) 和 第三方库(vendor) 入口
// webpack 配置
    module.exports = {
         entry: {
            app: './src/app.js',
            vendors: './src/vendors.js'
         }
    };
```
```javascript
    // 场景二：多页面应用程序，告诉 webpack 需要 3 个独立分离的依赖图
    // webpack 配置
    module.exports = {
        entry: {
            pageOne: './src/pageOne/index.tsx',
            pageTwo: './src/pageTwo/index.tsx',
            pageThree: './src/pageThree/index.tsx'
        }
     };
```
## 核心概念：出口 output、
* **作用**
    > 告诉 webpack 在哪里输出 构建后的包、包的名称 等
* **配置 单出口**
```javascript
    const path = require('path')
    module.exports = {
        entry: {
          main:'./src/index.tsx'
        },
        //__dirname:返回当前模块的目录名;
        //__filename:返回当前模块的文件名;
        output:{
            filename:  'main.js',
            path: path.resolve(__dirname, 'dist')
        }
    }
```
* **配置 多出口**
```javaScript
 const path = require('path')

 module.exports = {
    entry:{
        app: ' ./src/app.js',
        vendors: './src/vendors',
    },
    output:{
        filename:'[name].bundle .js',
        path: path.resolve(__dirname,'dist')
    }
 }
```
## 核心概念：loader
* **作用**
    >loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）
    >loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块

* **loader 使用方式：配置/安装**
    >常用 loader 安装, 下面案例只提供了 css 实际可以直接查看 config 中的配置。
    `yarn add -D style-loader css-loader file-loader url-loader post-loader babel-loader`
```javascript
    module.exports = {
        module : {
            rules:[{
                test: /\.(c|le)ss$/i,
                use:['style-loader','css-loader', 'postcss-loader']
            }]
        }
    };
    // 或
    module.exports ={
        module: {
            rules: [
                {
                    test: /\.(c|le)ss$/i,
                    use: [
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
```
* **loader 特性**
    1. 几乎所有 loader 都需要安装， 但不需要在 webpack 配置文件中通过 `require` 引入
    2. 逆向编译，链式传递。简单来说从右往左，在从下到上进行编译到，下面到列子中 loader 先把 css 通过 postcss 编译成 loader 在编译为 css 再到 loader 之后 style 最后 loader 编译完成

## 核心概念：plugin
* **作用**
    >可以处理各种任务，从打包优化和压缩，一直到重新定义环境中的变量
    >plugins 就是使用webpack的插件的地方

* **plugin 使用**
    >安装常用插件
    `yarn add -D html-webpack-plugin clean-webpack-plugin`

* **plugin 配置**
```JavaScript
// webpack 配置
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    plugins: [
        new CleanWebpackPlugin(), // 每次打包时会删掉你在 output 中配置的目录
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })                        // 根据template指定的html文件，来帮助你打包生成html(如果是多页开发则需要配置多个，建议根据entry来遍历后进行数组push操作)， 还有chunk属性 string[]，当前html会自动引入js文件
    ]
};
```
* **plugin 特性**
    >有些插件需要单独安装，有些插件是webpack内置插件 不需要单独安装

    >但所有的插件都 需要 在`webpack` 配置文件中通过 `require` 引入


## 线上与开发环境
* **线上与线下**
    >当在配置开发环境是可以安装 `webpack-dev-servet` 实现当代码修改后，页面会随即刷新，还可以使用 `webpack-dev-middlware 和 express` 实现 node 当生产环境。当你使用 `webpack-dev-servet` 打包后并不会为你生成 `dist`，因为 `webpack-dev-servet` 将文件打包到了内存中，来提高效率。
    >线上环境不需要这种 `webpack-dev-servet` 来帮你开启一个服务，所以往往会将其分开配置。为了节省配置的复杂性和重复性，会需要安装 'yarn add -D webpack-merge'
    >Hot Module Replacement(热模块更换): 页面数据在不更改的情况下，只更新你修改后 css 样式。
    > devtools（sourceMap webpack中专门用来获取错误的配置方案） 一般用来处理打包处理报错结果的，根据不同的配置会出现不同的打包速度。
        * cheap: 在生成 sourceMap 时，只带行信息，不带列信息。
        * module: 如果没有添加 module 那么在编译生成 sourceMap 时不会处理 module
        * eval： 生成 sourceMap 的方式
        * sourceMap： 会生成 sourcMap 文件，如果配置了 eval 则会编译到 dist 也就是出口文件中
        * 开发环境推荐使用： 'cheap-module-eval-source-map'， 生成环境推荐使用：'cheap-module-source-map'

* **环境配置**
```javascript
// 开发环境
const webpack = require('webpack');
const devConfig = {
    mode: 'development',
    devtool: 'inline-cheap-module-source-map',
    output: {
        filename: "[name].js",
        chunkFilename: "[name].chunk.js",
        path: path.resolve(__dirname, '..', 'dist'),
    },
    devServer: {
        contentBase: './dist',
        overlay: true,      // 将错误显示在页面上
        port: '9004',       // 启动端口号
        open: true,         // 打包完毕后自动启动页面
        host: '0.0.0.0',
        hot: true,          // 开始热模块更新
        hotOnly: true,      // 无需页面刷新作为构建失败的回退
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin() // 启动热模块更新
    ],
    module: {
          rules: [
               {
                    test: /\.(c|le)ss$/i,
                    use: [
                        'style-loader',
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

          ]
    }
};
module.exports = devConfig;

// 生产环境
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const prodConfig = {
  mode: 'production',
  devtool: 'nosources-source-map',
  output: {
      filename: "[name].[contenthash].js",
      chunkFilename: "[name].[contenthash].chunk.js",
      path: path.resolve(__dirname, '..', 'dist'),
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
               test: /\.(c|le)ss$/i,
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
};
module.export = prodConfig

// 通用环境
// 开发和生产环境都要用到 CleanWebpackPlugin，htmlWebpackPlugin
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(prodConfig, {
    plugins: [
        new CleanWebpackPlugin(),
         new HtmlWebpackPlugin({
              title: "react webpack",
              template: "src/index.html",
              minify: {
                  removeAttributeQuotes: true, //压缩 去掉引号
              },
         }),
    ]
})
```

## 使用 babel
* **配置 babel**
    > babel 可以将js中 `ES6` 在打包后编译为 `ES5` 让其可以兼容老的游览器比如：ie， 首先需要安装`yarn add -D babel-loader @babel/core @babel/preset-env @babel/polyfill @babel/plugin-syntax-dynamic-import @babel/preset-react`

1. @babel/core 可以让 `webpack` 读取js内容并将其转换成 **`AST抽象语法树`** 最后转化为 `ES5`

2. 实际上 `babel-loader` 并未做任何事情。只是在项目中创建 `.babelrc` 配置, 然后 `babel` 会通过 `babelrc` 来转化代码。

3. `@babel/polyfill` Babel无法转换一些新的js语法，列如：ES6在Array对象上新增了Array.from方法。需要使用babel-polyfill，为当前环境提供一个垫片。（但是polyfill目前也无法转换最新的API，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象都不会转码。）
```javascript
module.exports = {
  module: {
      rules: [
          {
              test: /\.jsx?$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                  loader: 'babel-loader',
                  options: {
                      presets: [
                          // presets 配置参数写法，数组第一个target要使用到preset，第二个options为参数
                          ['@babel/preset-env', {
                          // 如果没有配置，那么在编译时会将原本没用到的低版本特性也全部编译进来。造成文件非常大
                              useBuiltIns: 'usage',
                              "colorjs": 3
                          }],
                          '@babel/preset-react'
                      ],
                      plugins: [
                          '@babel/plugin-syntax-dynamic-import'       // 兼容按需引入插件
                      ]
                  }
              }
          },
      ]
  }
}
```
*注意：上面提到 `polyfill` 用来转换新的js的方法，列如：Array。但如果引入的库也有一个与 Array 的方法一样的变量名，会造成全局污染。建议当封装自己 **js库** 或是 **ui库** 时用 `transform-runtime`。*

* **配置 transform-runtime**
    > 安装 `yarn add -D @babel/plugin-transform-runtime`
```json
{
  "plugins": [
    [
      "@babel/plugin-transform-runtime", {
        "corejs": 3,
        "helpers": true,
        "regenerator": true,
        "useESModules": false
      }
    ]
  ]
}
```

## 优化 webpack 打包文件大小

* **Tree Shaking 按需引入**
    > 当你在使用自己封装的工具类 `utils` 中某一个方法， 但你只使用了其中的一个方法，而 `webpack` 在帮你打包时却把庞大的 `utils` 全部打包了进去造成文件非常大，**Tree Shaking(翻译：摇树) 可以理解为 `Tree shaking` 帮你摇掉了你不需要的方法。**
```javascript
// 在开发模式中 Tree Shaking 是默认开启的。所以无需进行配置。
// webpack.dev.js
module.exports = {
  optimization: {
    usedExports: true
  }
};

// package.json
// sideEffects 属性接口 Boolean ｜ Array，分别表示 false 对所有文件执行 Tree Shaking， Array 对指定对文件或是后缀对文件进行 Tree Shaking
// "sideEffects": false | "sideEffects": [*.css, *sass] 这里指对所有对 css 和 sass 文件，不执行 tree shaking
```

* **Code Splitting 代码分割**
    >在多个 js 或是 html 中都引入了同一个第三方库，为了避免重复打包这个库，来减少打包后文件大小。需要配置 Code Splitting。
    >`splitChunks` 在打包执行代码分割时是先从 `chunks` 属性往下开始匹配是否满足某一项，当满足就会到 `cacheGroups` 组中进行匹配，当分组中都有一项同时满足会根据 `priority` 的优先级进行分割打包。注意代码分割并不是 `webpack` 的概念，在没有 `webpack` 时代都是先规划好代码在进行分开处理，只是后来有了 `webpack` 自动帮你处理。

**配置 splitChunks**
```javascript
module.exports = {
  // ...
  optimization: {
    // 如果你配置 splitChunks 为空对象会默认采用下面的配置。（官网的例子）
    splitChunks: {
      chunks: 'async',      // 当前配置表示只对异步代码生效， initial： 对同步代码进行分割， all：异步同步都执行分割。
      minSize: 30000,       // 当文件大于 30000字节 才执行打包
      minRemainingSize: 0,
      maxSize: 0,           // 与 minSize 正好相反
      minChunks: 1,         // Chunk 就好比是一个文件，当配配置表示该 chunk 引入次数是否满足大于等一1
      maxAsyncRequests: 6,  // 只会帮你打包6个文件，如果超过就不再做分割处理了
      maxInitialRequests: 4, // 入口的引入文件，只会打包三个 ，多了同样和上面一样不予处理
      automaticNameDelimiter: '~', // 文件与组之间链接时多链接符号
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,  // 匹配你引入的库，是否在node_modules中
          priority: -10,        // 优先级
          filename: 'vendors.js' // 配置该项后，通过 test 匹配到的文件统一打包到一个名为 vendors.js 到文件中
        },
        default: {
          priority: -20,
          reuseExistingChunk: true, // 如果当前块包含已从主捆绑包中拆分出的模块，则将重用该模块，而不是生成新的模块。这可能会影响块的结果文件名。
          filename: 'common.js'
        }
      }
    }
  }
}
```



## 优化 webpack 打包速度

* **配置 Dll**
    > `dll` 是通过提前安装你所使用的库，之后再去打包会通过从 `dll` 去拿如果没有再去 `node_module`
    > 创建 webpack.dll.js 文件
```javascript
// webpack.dll.js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    react: ['react', 'react-dom','react-router-dom', '@loadable/component' ] // 指定提前安装的库
  },
  output: {
    filename: "[name].dll.js",                                     // 将入口指定的库导出为 react.dll.js 的库
    path: path.resolve(__dirname, "..", "dll"),
    library: "[name]"                                              // 将 react.dll.js 暴露到全局变量名为 react 上， 之后会通过html引入来使用
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({                                        // 通过 webpack 将所有库的依赖关系导出为 react.manifest.js
      name: "[name]",
      path: path.resolve(__dirname, "..", "dll/[name].manifest.js"),
    })
  ]
}
```
```javascript
// webpack.common.js
// 需要安装 yarn add -D add-asset-html-webpack-plugins， 会在html中自动引入静态文件。 如果用到多个 dll 的时候，需要引入多个当前的插件。
const AddAssetWebpackPlugin = require('add-asset-html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  plugins: [
    new AddAssetWebpackPlugin({
      filepath: path.resolve(__dirname, "..", "dll", 'react.js') 
    }),
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, "..", "dll", 'react.manifest.js')   // 引入各各库的依赖关系
    })
  ]
}
```

* **plugins 优化**
    > 通过使用 thread-loader 或是 happypack 来进行多线程打包（官方目前主推 thread-loader， happypack 不再进行维护更新）（楼主用的 thread-loader)
    > `parallel-webpack-plugin` 多页面项目时使用。多线程打包。


## gzip
>为你的文件开启gzip压缩是一个不错的选择，通常开启gzip压缩能够有效的缩小传输资源的大小，如果你的项目是用nginx作为web服务器的话，只需在nginx的配置文件中配置相应的gzip选项就可以让你的静态资源服务器开启gzip压缩
 ```
 #开启和关闭gzip模式
 gzip on;
 #gizp压缩起点，文件大于1k才进行压缩
 gzip_min_length 1k;
 # gzip 压缩级别，1-9，数字越大压缩的越好，也越占用CPU时间
 gzip_comp_level 6;
 # 进行压缩的文件类型。
 gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript ;
 #nginx对于静态文件的处理模块，开启后会寻找以.gz结尾的文件，直接返回，不会占用cpu进行压缩，如果找不到则不进行压缩
 gzip_static on
 # 是否在http header中添加Vary: Accept-Encoding，建议开启
 gzip_vary on;
 # 设置gzip压缩针对的HTTP协议版本
 gzip_http_version 1.1;
``` 
前端输出gzip文件，利用compression-webpack-plugin让webpack在打包的时候输出.gz后缀的压缩文件
```javascript
const CompressionPlugin = require("compression-webpack-plugin")

module.exports = {
  plugins: [
    new CompressionPlugin({
      test: /\.(js|css|html)$/,
      deleteOriginalAssets: false, // 是否删除源文件
      threshold: 1024 * 10         // 超过 10kb 才进行压缩
    })
  ]
}
```

这样不需要服务器主动压缩我们就已经可以得到gzip文件，在上面的nginx配置项中可以发现这一行
```
#nginx对于静态文件的处理模块，开启后会寻找以.gz结尾的文件，直接返回，不会占用cpu进行压缩，如果找不到则不进行压缩
    gzip_static on
```

## 魔法注释
    > 通过 魔法注释 来使用，参考下面案例。
```javascript
// webpackPrefetch： 等待你核心代码加载完以后，等页面宽带空闲以后再去加载。 webpackPreload： 和核心代码一起加载。 webpackChunkName: 作用与打包第三方库后的文件名
function hander () {
  import (/* webpackPrefetch: true */ './click.js')
    .then(res => {
      console.log(res);
    })
}
```

## Shimming 填隙
    > 当你 webpack 监测你到模块中使用到一个 _ 会自动帮你引入你预设的库。
```javascript
const webpack = require('webpack');
module.exports = {
  plugins: [
    new webpack.ProvidePlugin({
      _: 'lodash',
      _cloneDeep: ['lodash', 'cloneDeep']
    })
  ]
}
```

## 自定义loader
> loader 其实本身也是函数，但是不能使用箭头函数，当你使用自定义 `loader` 时，其this指向了 `webpack` 的 `loader`, 可以在官网中查看 loader API
> webpack 官网提供了一个 `loader-utils` 来更好的处理，自定loader中的 `this`
> webpack 配置属性 `resolveLoaders.modules = [ 'node_module', './loaders']` 这里配置主要解决，在使用多个自定义的loader时，可以像第三方loader一样，直接像 `babel-loader` 一样是用，这块配置表示帮你去先去node_module里去找如果没有自定义loader， 那就去 loaders 里找。

```javascript
const loaderUtils = require('loader-utils');

// 接受一个参数，表示文件本身的内容。那如果想拿到 options 中的内容的话，可以通过 this 来获取比如 name 是通过 this.options.name
// 使用了 loader-utils 可以使用 loader-utils 提供的 this.callback 来返回
/*
this.callback(
 err: Error | null,         // 错误
 content: string | Buffer,  // 返回的内容
 sourceMap?: SourceMap,
 meta?: any                 // 自己想要传递的内容
)
*/

module.exports = function(source) {
  const  options = loaderUtils.getOtions(this);
  const callback = this.async();    // 想使用异步函数

  console.log(this)
  setTimeout(() => {
    console.log(source)
    callback(null, source)          // return 异步结果
  }, 1000)
  return source
}
```