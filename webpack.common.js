// 这个是公共的打包配置(共享配置)
// 设置入口和出口、开发和正式环境里需要用到的全部插件
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin") // 自动生成html的插件
const { CleanWebpackPlugin } = require("clean-webpack-plugin") // 自动清理dist文件夹的插件

// 如果要接收环境变量的话 需要从对象改成函数
module.exports = function (env) {
    return {
        entry: {
            app:'./src/index.js'
        },
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, './dist')
        },
        // loader use 执行顺序从右到左 从下往上
        module: {
            rules: [
                { test: /\.js$/, use: 'babel-loader' },
                { test: /\.css$/, use: ['style-loader','css-loader'] }, // 解析css
                { test: /\.(png|svg|jpg|gif)$/, use: ['file-loader'] }, // 解析图片
                { test: /.(woff|woff2|eot|ttf|otf)$/, use: ['url-loader'] }, // 解析字体
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: '1.引入公共打包配置，2.简化控制台输出信息'
            }),
            new CleanWebpackPlugin()
        ],
        stats: {
            children: false, // 添加 children 信息
            chunks: false, // 添加 chunk 信息（设置为 `false` 能允许较少的冗长输出）
            entrypoints: false, // 通过对应的 bundle 显示入口起点
            modules: false, // 添加构建模块信息
        },
        // 性能
        performance: {
            hints: 'warning',
            maxEntrypointSize: 50000000, // 入口起点的最大体积
            maxAssetSize: 30000000, // 生成文件的最大体积
            // 只给出 js 文件的性能提示 (提供资源文件名的断言函数)
            assetFilter: function(assetFilename) {
                return assetFilename.endsWith('.js');
            }
        },
    }
}