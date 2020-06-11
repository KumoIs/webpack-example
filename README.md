## 一、什么是 webpack
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

![image-20200526221423380](C:\Users\JuJuBoy\AppData\Roaming\Typora\typora-user-images\image-20200526221423380.png)
* **[webpack官网](https://webpack.docschina.org)**


## 二、安装 以及指令
   * **安装，提醒：webpack4.x 版本需要额外安装 webpack-cli**       
```npm
yarn add webpack webpack-cli -D // 安装 `webpack`
```

   * **配置**
```npm
yarn webpack index.js // 指定你要打包一个名为 index.js 的文件。如果你没有配置 `webpack.config.js` webpack 会自动给你调用它的默认打包方式

Hash: '*****'  // 本次打包唯一一次唯一值
Version： webpack 4.*.* // 本地打包webpack版本
Time: **m // 本次打包耗时
Built at: 2020-05-26 21:50
	Asset(文件名)		Size(文件大小)	   Chunks(文件对应ID)	Chunk Names(入口文件 对应 entry)
	dist.js			  1.36KiB			0				   main
```
   *  **指定配置文件**
```npm
yarn webpack --config webapckconfig.js  // 指定一个文件名为`webpack`配置文件，来执行打包。
```
## 三、核心概念：入口 entry
* **作用**
  
    >告诉 webpack 从哪个文件开始构建，这个文件将作为 webpack 依赖关系图的起点 
* **配置 单入口**
```javascript
// webpack 配置 
    module.exports = { 
        entry: './src/index.js' 
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
            pageOne: './src/pageOne/index.js', 
            pageTwo: './src/pageTwo/index.js', 
            pageThree: './src/pageThree/index.js'
        }   
     };
```
## 四、核心概念：出口 output、
* **作用**
  
    > 告诉 webpack 在哪里输出 构建后的包、包的名称 等
* **配置 单出口**
```javascript
    const path = require('path')
    module.exports = {
        entry: {
          main:'./src/index.js'
        },
        //__dirname:返回当前模块的目录名; 
        //__filename:返回当前模块的文件名;
        output:{
            filename:  'main.js',
            path: path.resolve(_dirname,'dist')
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
        path: path.resolve(process.cwd(),'dist') //process.cwd()CurrentWorkingDirectory(__dirname 相同) 处理当前工作目录 
        
    }
 }
```
## 五、核心概念：loader
* **作用**
    >loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）
    >loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块
* **loader 使用方式：配置/安装**(常用)
```npm
yarn add css-loader style-loader
```
```javascript
    module.exports = {
        module : {
            rules:[{
                test:/\.css$/,
                use:['style-loader','css-loader']
            }]
        }
    };
    // 或
    module.exports ={
        module:{
            test:[{
                test: /\.css$/,
                exclude: /(node_modules|bower_components)/, //这里的话 是要排除 node_modules或bower_components
                use: ['style-loader',{
                    loader:'css-loader',
                    options:{   //为了文件更干净 可以创建一个 .babelrc文件 将options对象放进去  还有可以直接在这里这样配置  第三种方法则是 package.js里配置
                        modules:true
                    }
                }]
             }]
        }
    }
    //html,js都是类似操作，或者 npm 看文档说明配置
```
* **loader 特性**
    1. 几乎所有 loader 都需要安装， 但不需要在 webpack 配置文件中通过 `require` 引入
    2. 逆向编译，链式传递。简单来说从右往左，在从下到上进行编译到，下面到列子中 loader 先把 css 通过 postcss 编译成 loader 在编译为 css 再到 loader 之后 style 最后 loader 编译完成
```javascript
// webpack 配置 
module.exports = { 
    module: { 
        rules: [{ 
            test: /\.css$/, 
            use: ['style-loader', 'css-loader', 'postcss-loader'] 
        }] 
    } 
 };
```
>// 如上，css 文件编译顺序依次为：postcss-loader ---> css-loader ---> style-loader 
>// 编译过程中，第一个loader的值 传递给下一个loader，依次传递；最后一个loader编译完成后，将预期值传递给 webpack

## 六、核心概念：plugin
* **作用**
    >可以处理各种任务，从打包优化和压缩，一直到重新定义环境中的变量

    >plugins 就是使用webpack的插件的地方
* **plugin 使用**
```npm
npm i html-webpack-plugin -D
```
```JavaScript
// webpack 配置 
const HtmlWebpackPlugin = require('html-webpack-plugin'); 

module.exports = { 
    plugins: [ 
        new HtmlWebpackPlugin({ 
            template: './src/index.html' 
            }) 
    ] 
};
```
* **plugin 特性**
    >有些插件需要单独安装，有些插件是webpack内置插件 不需要单独安装
    
    >但所有的插件都 需要 在`webpack` 配置文件中通过 `require` 引入

* **plugin 剖析：**
    > webpack 插件是一个具有 apply 属性的 JavaScript 对象 

    > apply 属性会被 webpack compiler 调用，并且 compiler 对象可在整个编译生命周期访问

```javascript
// ConsoleLogOnBuildWebpackPlugin.js 

const pluginName = 'ConsoleLogOnBuildWebpackPlugin'; 

class ConsoleLogOnBuildWebpackPlugin { 
    apply(compiler) {                
        compiler.hooks.run.tap(pluginName, compilation => { 
            console.log("webpack 构建过程开始！"); 
            }); 
     } 
}
```
## 七、核心概念：模式 mode（webpack 4.x）
* **作用**
  
    >告诉 webpack 使用相应模式的内置优化 
```javascript
// webpack 配置 
module.exports = { 
    mode: 'production' 
};
```
CLI 参数中 
```npm
webpack --mode=production
```

## 八，devServer 和 devtools 以及 HMR
> devServer 可以为我们启动 `webpack` 打包后启动一个服务，即便你修改了他也可以实现自动更新。
```javascript
// 设置 devServer 前提需要安装 `webpack-dev-server` 如果不使用可以使用 `webpack-dev-middleware` + `express` 来实现一个简单 server
// ⚠️注意： webpack-dev-server 打包时他的打包目录会在内存中，这样主要是提高打包速度 。
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config');
const compiler = webpack(config);

const app = express();

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}))

app.listen(8099, () => {
    console.log('测试链接通过。。。')
})
```
> HMR: Hot Module Replacement, 当你在页面增加了一些数据时，但是发现 css 不对，可你修改样式以后发现之前增加当数据没了，又要重新增加。HMR 就能解决次问题。
> devtools（sourceMap webpack中专门用来获取错误的配置方案） 一般用来处理打包处理报错结果的，根据不同的配置会出现不同的打包速度。
* cheap: 在生成 sourceMap 时，只带行信息，不带列信息。
* module: 如果没有添加 module 那么在编译生成 sourceMap 时不会处理 module
* eval： 生成 sourceMap 的方式
* sourceMap： 会生成 sourcMap 文件，如果配置了 eval 则会编译到 dist 也就是出口文件中
 
>（具体配置查看package.json）

## 九、babel

> babel 可以将js中 `ES6` 在打包后编译为 `ES5` 让其可以兼容老的游览器比如：ie， 首先需要安装 babel-loader 和 @babel/core

`yarn add babel-loader @babel/core @babel/preset-env @babel/polyfill`

1. @babel/core 可以让 `webpack` 读取js内容并将其转换成 **`AST抽象语法树`** 最后转化为 `ES5`

2. 当配置了以上 `babel`, 但实际上并未做任何事情。只是在项目中创建 `.babelrc` 配置, 然后通过 `preset-env` 来去预设他，让其可以将代码转换成 `ES5`

3. @babel/polyfill Babel默认只转换新的JavaScript句法（syntax），而不转换新的API，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如Object.assign）都不会转码。举例来说，ES6在Array对象上新增了Array.from方法。Babel就不会转码这个方法。如果想让这个方法运行，必须使用babel-polyfill，为当前环境提供一个垫片。
```javascript
module.exports = {
  moduel: {
    rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                // presets 配置参数写法，数组第一个target要使用到preset，第二个options为参数
                ['@babel/preset-env', {
                // 指定编译环境
                  targets: {
                    chrome: "67", 
                  },
                // 如果没有配置，那么在编译时会将原本没用到的低版本特性也全部编译进来。造成文件非常大
                  useBuiltIns: 'usage'
                }]
              ]
            }
          }
        },
    ] 
  }
}

// index.js
// 注意：最好是在顶部引入，优先引入它，以免出现报错 或者 失效 的情况
// 使用方法 entry: ["@babel/polyfill"， "index.js"] 或者 import
import '@babel/polyfill'
```
**注意：上面提到 `polyfill` 专门用来处理全局上最新 API 但是当你引入第三方库也出现了这些 API 就会污染内置对象，所以当你在应用库或者ui组件时并不建议使用 `polyfill`，而是使用 `transform-runtime`**
> 使用 `transform-runtime` 自然是先安装 `yarn add @babel/plugin-transform-runtime`(下面将使用第二种方法配置，上面当 `presets` 同样可以用该方法)，先创建一个 `.babelrc` 文件
```javascript
// .babelrc

{
  "plugins": [
    [
      "@babel/plugin-transform-runtime", {
        "corejs": 3,
        "helpers": true,
        "regenerator": true,
        "useESModules": false,
      }
    ]
  ]
}


// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      },
    ] 
  }
}

// 当你配置了 babel-loader 时，他会让 webpack 打包遇到 js 文件时默认使用 .babelrc 来处理打包
```

## 十、Terr Shaking
> 在 js 使用 utilsjs 某一个方法 可是只使用了一个，而 webpack 将所有 utils 方法都编译出来了，这种是完全多余的，Tree Shaking 解决了这个问题。
```javascript
module.exports = {
  optimization: {
    usedExports: true
  }
};
// 上面代码中，如果是开发模式，也无需配置，webpack 在开发模式下会自动配置。

// package.json
{
  "sideEffects": false // false 表示对所有对文件都采用 Tree ShaKing
  // 指定那些文件不用 Tree Shaking, 以数组形式引入多个不需要 Tree Shaking 的文件
  // "sideEffects": ['@babel/polyfill']
}
```