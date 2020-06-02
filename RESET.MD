





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
```javascript
yarn add webpack webpack-cli -D // 安装 `webpack`
```

   * **配置**
```javascript
yarn webpack index.js // 指定你要打包一个名为 index.js 的文件。如果你没有配置 `webpack.config.js` webpack 会自动给你调用它的默认打包方式

//  打包完成以后的提示，以下为详细解释
Hash: '*****'  // 本次打包唯一一次唯一值
Version： webpack 4.*.* // 本地打包webpack版本
Time: **m // 本次打包耗时
Built at: 2020-05-26 21:50
	Asset(文件名)		Size(文件大小)	   Chunks(文件对应ID)	Chunk Names(入口文件 对应 entry)
	dist.js			  1.36KiB			0				   main
[0] ./src/index.js + 3 modules 714 bytes {0} [built] (打包的入口文件， 打包了那些文件)
    | ./src/index.js 151 bytes [built]
    | ./src/header.js 187 bytes [built]
    | ./src/sidebar.js 188 bytes [built]
    | ./src/content.js 188 bytes [built]
```
   *  **指定配置文件**
```javascript
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
      // [name] 是指 entry 对象中的 key
        filename:'[name] .js',
        path: path.resolve(process.cwd(),'dist') //process.cwd()CurrentWorkingDirectory(__dirname 相同) 处理当前工作目录 
        
    }
 }
```
## 五、核心概念：loader
* **作用**
    
    >loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）
    >loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块
* **loader 使用方式：配置**(常用)
```javascript
// load 配置 图片 和 scss
// file-loader 可以打包文件 url-loader 可以文件打包成 base64 地址 本次配置用来处理图片
// postcss 常用 autoprefixer 用来给css自动兼容游览前缀 列如: -webkit-transform: franslate(50%, 50%)
yarn add style-loader css-loader file-loader/url-loader sass-loader postcss-loader
```
```javascript
modules.exports = {
    module: {
        rules: [
            {
                // test：正则来匹配后缀，要打包的目标文件。
                test: /\.(jpg|png|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        // 打包以后的文件名 name： 文件名、hash：文件hash值、ext：文件后缀
                        name: '[name]_[hash].[ext]',
                        // 打包成图片到指定的地址
                        outputPath: 'assets/',
                         // 图片小于设定的大小时，打包成base64，否则打包成图片在 outputPath 指定的地址
                        limit: 10240,
                    }
                }
            },
            {
             	test: /\.(css|scss)$/,
                use: [
                    'styled-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ]
            }
        ]
    }
}
```

* **loader 特性**
    1. 几乎所有 loader 都 需要安装， 但 不需要 在 webpack 配置文件中通过 `require` 引入
    2. 逆向编译，链式传递
>当 **use** 为数组时，按上列 **css** 为列子 从下到上编译 sass-loader --> postcss-loader --> css-loader --> styled-loader。
>编译过程中，第一个loader的值 传递给下一个loader，依次传递；最后一个loader编译完成后，将预期值传递给 webpack

## 六、核心概念：plugin
* **作用**
    >可以处理各种任务，从打包优化和压缩，一直到重新定义环境中的变量
>
    >plugins 就是使用webpack的插件的地方
    
* **plugin 使用**
```JavaScript
// clean-webpack-plugin 并不是官方推荐， 所以无法在官网中查看使用说明。作用： 打包前删除你 output 中指定 path 文件
//  html-webpack-plugin 可以帮助你打包 html 文件，并且会根据 output 中指定的 path 自动增加 script 标签且 src 的内容为 output.path
yarn add html-webpack-plugin clean-webpack-plugin
```
```JavaScript
// webpack 配置 
const HtmlWebpackPlugin = require('html-webpack-plugin'); 

module.exports = { 
    plugins: [ 
      new HtmlWebpackPlugin({ 
        template: './src/index.html' 
      }),
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
```javascript
// CLI 参数中 
webpack --mode=production
```

# 八、sourceMap
> 首先 `sourceMap` 他是一个映射关系，如果没有 `sourceMap` 当项目报错而报错地址是打包好的js文件中的某一行，实际上是对应尚未打包的js文件中的某一行。也就是说当项目报错，你无法得知源代码中是哪里在报错。

```javascript
/** 
 * devtool 如果在开发环境下(development) 会默认使用 'source-map'
 * desc devtool {
 *    none： 不适用任何映射
 *    inline-source-map： 精确报错，报错时告知源代码第几行号 ，第几个字符报错了。(想到耗费性能)
 *    cheap-inline-source-map: 只会提示多少行报错。(相比上面快很多)
 *    cheap-module-inline-source-map: 相比上属性不同的是，上面属性只管业务代码。而该属性管第三方 module 的报错。
 *    eval: 速度最快，但报错提示时并非最全的。
 *    cheap-module-eval-source-map: 推荐在 development用 速度较快，报错提示基本能满足，如果需要在线上环境也使用那么推荐 cheap-module-source-map
 * }  
 */
module.export = {
  mode: 'development',
  devtool: 'none',
}
```