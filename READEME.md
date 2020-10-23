## 一.概念

webpack 是一个模块打包器(module bundler)。它将根据模块的依赖关系进行静态分析，然后将这些模块按照指定的规则生成对应的静态资源。

### 1.1.入口(entry)

指示webpack应该使用哪个模块来作为构建其内部依赖图的入口起点。(默认值为**./src**)

### 1.2.出口(output)

这个属性告诉webpack在哪里输出它所创建的 bundles，以及如何命名这些文件。(默认值为**./dist**) 

1. 通过output.filename: 告诉webpack bundle的名称；
2. 通过output.path:告诉webpack bundle生成(emit)到哪里。

### 1.3.loader

让webpack能够去处理那些非js文件(webpack自身只能处理js)，loader可以将所有类型的文件转换为webpack能够处理的模块(modules)。

1. test属性：用于标识出应该被对应的loader进行转换的某个或者某些文件；
2. use属性：用于表示进行转换时，应该使用哪个loader。

### 1.4.插件(plugins)

loader被用于转换某些类型的模块，而插件可以用于执行范围更广的任务，从打包优化到压缩，插件目的在于解决loader无法实现的其他事情。使用步骤为：

1. 先require它，然后把它添加到plugins数组中；
2. 可以在配置文件中因为不同目的而多次使用同一个插件，通过 new 来创建一个它的实例。

### 1.5.模式(mode)

通过选择development和production之中的一个，来设置mode参数，你可以启用相应模式下的webpack内置的优化。

## 二.项目实战

### 2.1.初始化项目

```js
npm init -y
```

执行上述命令后会生成一个package.json文件，接着安装webpack4

### 2.2.安装webpack4

npm i -D webpack webpack-cli

如果你使用的是webpack4+版本，你还需要安装CLI。-D是指开发环境需要，上线不需要。

### 2.3.创建目录

1. 创建src 

   这个里面放的是源代码，“源”代码是用于书写和编辑的代码。

2. 创建dist，并且在该文件夹下创建index.html

   这个里面放的是分发代码，“分发”代码是构建过程产生的压缩后的“输出”目录，最终将在浏览器中加载；

   index.html页面script引入的标签由原始的./src文件改为加载最终打包后的bundle，main.js；

   执行 webpack 命令，会将我们的脚步作为入口起点，然后输出 main.js。

3. 配置webpack.config.js

   添加配置文件比在终端中手动输入大量命令要高效的多，所以让我们创建一个取代之前使用CLI选项方式的配置文件。

   ```diff
   webpack-demo
     |- package.json
   + |- webpack.config.js
     |- /dist
       |- index.html
     |- /src
       |- index.js
   ```

​	考虑到用CLI这种方式来运行本地的webpack很不方便，我们可以通过创建一个npm脚本的方式来设置快捷方式。

​	

```diff
"scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
+     "build": "webpack"
    },
```

​	通过运行 npm run build 命令就可以代替我们之前使用的webpack命令。并且通过向该命令和你的参数见添加两个中横线，可以将自定义参数传递给webpack，npm run build -- --colors。

### 2.4.管理资源

​	1.加载css

```js
cnpm i -D style-loader css-loader
```

安装上述两个模块，style-loader依赖于css-loader，loader的书写规则为从右到左形成一种依赖关系，最先处理的放在最右边。

​	2.加载图片

```js
cnpm i -D file-loader
```

可以看到实际的文件名已更改为诸如hash模式那样前缀的类型，这意味着webpack在src文件中找到我们的图片文件，并成功处理过它，下一步紧接着的就是压缩和优化你的图像。

```js
cnpm i -D url-loader
```

提高文件的限制大小，之前是224kib，配置如何展示性能提示。例如，如果一个资源超过250kb，webpack会对此输出一个警告来通知你，performance属性。

​	3.加载字体

file-loader和url-loader可以接收并加载任何文件，然后将其输出到构建目录，也就是说，我们可以将它们用于任何类型的文件，包括字体。