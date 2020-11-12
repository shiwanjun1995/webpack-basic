// 这个是公共的打包配置(共享配置)
// 设置入口和出口、开发和正式环境里需要用到的全部插件
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin") // 自动生成html的插件
const { CleanWebpackPlugin } = require("clean-webpack-plugin") // 自动清理dist文件夹的插件

// 如果要接收环境变量的话 需要从对象改成函数
module.exports = function (env) {
    console.log('公共模块配置，当前的环境是',env,arguments);
    return {
        entry: {
            app:'./src/index.js'
        },
        // 指示webpack如何去输出、以及在哪里输出你的 [bundle、asset和其他你所打包或使用webpack载入的任何内容]
        output: {
            // chunkhash只能用在生产环境不能用在开发环境
            filename: env.dev ? 'js/[name].js' : 'js/[name]-[contenthash:8].js', // 决定了每个输出bundle的名称 这些bundle将写入到 output.path选项指定的目录下
            path: path.resolve(__dirname, './dist') // 目录对应一个绝对路径
        },
        // 模块规则(配置loader、解析器等选项) loader use 执行顺序从右到左 从下往上
        /**
         * 这些选项决定了如何处理项目中的不同类型的模块
        */
        module: {
            /**
             * 创建模块时，匹配请求的规则数组。这些规则能够修改模块的创建方式，这些规则能够
             * 对模块(module)应用loader，或者修改解析器(parser)。
            */
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/, // 确保转译竟可能少的文件
                    use: ['babel-loader?cacheDirectory'] // 将babel-loader提速至少两倍，将转译的结果缓存到文件系统中 将使用默认的缓存目录(node_modules/.cache/babel-loader)
                },
                { test: /\.css$/, use: ['style-loader','css-loader'] }, // 解析css
                { test: /\.(png|svg|jpg|gif)$/, use: ['file-loader'] }, // 解析图片
                { test: /.(woff|woff2|eot|ttf|otf)$/, use: ['url-loader'] }, // 解析字体
            ]
        },
        // 配置模块如何解析(不适用于对loader解析)
        /**
         * 例如，当在 ES2015 中调用 import "lodash"，
         * resolve 选项能够对 webpack 查找 "lodash" 的方式去做修改
        */
        resolve: {
            extensions: [".js",".json"], // 书写的时候可以省略后缀，自动解析确定的扩展
            // 配置别名 便于书写(模块别名相对于当前上下文导入)
            /**
             * 创建 import 或 require的别名，来确保模块引入变得更简单
             * 例如，一些位于src/文件夹下的常用模块
            */
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        },
        // 用于以各种方式自定义webpack构建过程，并且webpack附带了各种内置插件
        plugins: [
            new HtmlWebpackPlugin({
                title: '1.开发环境和正式环境的命令行配置',
                template: './index.html'
            }),
            new CleanWebpackPlugin()
        ],
        // 提供源代码映射文件供调试使用
        devtool: env.dev ? 'cheap-module-eval-source-map' : 'none',
        // 此项配置是用来定制watch模式的选项(监听文件变化，当它们修改后会重新编译)
        watchOptions: {
            ignored: path.resolve("./node_modules")
        },
        // 外部扩展 防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖(external dependencies)。
        /**
         * 如果我们想引用一个库，但是又不想让webpack打包，
         * 并且又不影响我们在程序中以CMD、AMD或者window/global全局等方式进行使用，
         * 那就可以通过配置externals。
         */
        externals: {
            // 将外部变量或者模块加载进来
            // 无需打包的配置,代表这是外部引入的，无需打包
            // 这个里面的jquery是指require('jquery')或者通过其它方式中引用的jquery，而jQuery就是scripts源代码中最终暴露出来的全局对象
            jquery: 'jQuery',

        },
        stats: {
            children: false, // 添加 children 信息
            chunks: false, // 添加 chunk 信息（设置为 `false` 能允许较少的冗长输出）
            entrypoints: false, // 通过对应的 bundle 显示入口起点
            modules: false, // 添加构建模块信息
        },
        // 性能
        performance: {
            hints: 'warning', // 性能提示中抛出警告
            maxEntrypointSize: 50000000, // 入口起点的最大体积
            maxAssetSize: 30000000, // 生成文件的最大体积
            // 只给出 js 文件的性能提示 (提供资源文件名的断言函数)
            assetFilter: function(assetFilename) {
                return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
            }
        },
    }
}