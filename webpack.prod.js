// 这个是正式环境下的配置
// 设置压缩输出和更轻量的source map
const { merge } = require("webpack-merge")
const common = require("./webpack.common.js")
const UglifyJSPlugin = require("uglifyjs-webpack-plugin") // 引入一个能够自动删除未引用代码的压缩工具
const webpack = require("webpack")
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin // 引入打包分析插件

module.exports = merge(common, {
    devtool: 'source-map',
    plugins: [
        // new UglifyJSPlugin({
        //     sourceMap: true,
        // }),
        // 不同的库 library 根据不同的环境会增加或者删除代码 进而优化代码 设置一个环境变量
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new BundleAnalyzerPlugin()
    ],

})