// 创建一个取代CLI命令选项方式的配置文件
/**
 * path是node.js的一个路径处理模块，不仅仅有path.resolve还有path.join等处理路径的方式，path.resolve操作类似于cd操作，就是一步一步查找，而__dirname则是获得当前文件所在目录的完整路径名
 */
const path = require('path') // 引入path模块
const HtmlWebpackPlugin = require('html-webpack-plugin') // 引入自动生成html文件的模块
const {CleanWebpackPlugin} = require('clean-webpack-plugin') // 引入清理dist文件夹的模块

// console.log(__dirname + '/src');
// console.log(path.resolve(__dirname, '/src'));
// console.log(path.resolve(__dirname, 'dist'));
// console.log(path.resolve(__dirname, './dist'));

module.exports = {
    // 入口起点
    // entry: './src/index.js',
    // 多入口
    entry: {
        app: './src/index.js',
        print: './src/print.js'
    },
    devtool: 'cheap-module-eval-source-map',
    // 告知开发服务器(dev server)在哪里查找文件
    devServer: {
        contentBase: './dist',
        port: 9000,
        open: true
    },
    // 出口
    output: {
        // 根据入口起点名称动态生成 bundle 名称
        filename: '[name].bundle.js', // 最终输出的文件名称
        path: path.resolve(__dirname, './dist') // 输出目录的绝对路径
        /**
         * __dirname 表示的是当前文件的绝对路径
         * 被path.resolve()处理过后就是相对当前文件路径的相对路径
         * 不加这个就会变成相对于当前工作目录的路径了
        */
    },
    // 开发模式
    mode: 'production',
    // loader
    module: {
        rules: [
            // 从右到左形成一种依赖性，最先配置的放在最右，此处 style-loader依赖于css-loader
            {test: /.css$/, use: ['style-loader','css-loader']},
            // 图片
            {test: /.(png|svg|jpg|gif)$/, use: ['file-loader']},
            // 字体
            {test: /.(woff|woff2|eot|ttf|otf)$/, use: ['url-loader']},
        ]
    },
    // 扩展loader
    plugins: [
        new HtmlWebpackPlugin({
            title: '每次编译会自动在内存中生成一个html文件'
        }),
        // new CleanWebpackPlugin(['dist']),
        new CleanWebpackPlugin()
    ],
    // 加载图片后控制台会出现警告提示，提示文件过大影响性能
    // // 关闭webpack的性能提示
    // performance: {
    //     hints: false
    // }
    performance: {
        // 将展示一条警告，提醒你这是体积大的文件
        hints: 'warning',
        // 入口起点的最大体积 默认为250kb 250000 (bytes)。
        // 1 K = 1024 byte
        // 1 M = 1024 K
        // 1 G = 1024 M
        maxEntrypointSize: 50000000,
        // 生成文件的最大体积
        maxAssetSize: 30000000,
        // 只给出 js 文件的性能提示 (提供资源文件名的断言函数)
        assetFilter: function(assetFilename) {
            return assetFilename.endsWith('.js');
        }
    }
}
