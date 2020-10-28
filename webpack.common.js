// 这个是公共的打包配置
// 设置入口和出口、开发和正式环境里需要用到的全部插件
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin") // 自动生成html的插件
const { CleanWebpackPlugin } = require("clean-webpack-plugin") // 自动清理dist文件夹的插件

// 如果要接收环境变量的话 需要从对象改成函数
module.exports = function (env) {
    console.log(env);
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
                { test: /\.css$/, use: ['style-loader','css-loader'] }, // 解析css
                { test: /\.(png|svg|jpg|gif)$/, use: ['file-loader'] }, // 解析图片
                { test: /.(woff|woff2|eot|ttf|otf)$/, use: ['url-loader'] }, // 解析字体
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: '每次编译会自动在内存中生成一个html文件'
            }),
            new CleanWebpackPlugin()
        ]
    }
}