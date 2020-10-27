// 这个是开发环境下的配置
// 设置强大的source map和devServer
const { merge } = require("webpack-merge") // 引入公共环境下的配置文件
const common = require("./webpack.common.js")

module.exports = merge(common, {
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        port: 8888,
        open: true
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
})