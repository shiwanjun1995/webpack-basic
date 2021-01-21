// 这个是开发环境下的配置
// 设置强大的source map和devServer
const path = require("path")
console.log( path.join(__dirname));
const merge = require("webpack-merge") // 引入公共环境下的配置文件
const common = require("./webpack.common.js")

// 当配置文件是一个函数时，会将环境变量传给这个函数
module.exports = function (env) {
    // console.log('---开发环境---',env);
    // 传入环境变量 函数的参数
    return merge(common(env), {
        module: {
            rules: [
                // 解析css
                {
                    test: /\.(css|s[ac]ss)$/,
                    use: [
                        'style-loader', // 从js字符串创建style样式节点
                        'css-loader',  // 将css编译成CommonJS
                        'postcss-loader',
                        'sass-loader', // 将sass编译成css
                    ]
                }
            ]
        },
        devServer: {
            // contentBase: path.join(__dirname, "../dist"), // 告诉服务器从哪里提供内容(推荐使用绝对路径)
            compress: true, // 一切服务都启用gzip压缩
            disableHostCheck: false, // 避免主机受到DNS重新绑定的攻击
            hot: true, // 启用webpack的热模块替换特性(更新模块而不重新加载整个页面)
            // https: true, // 默认情况下通过HTTP提供服务，也可以选择带有HTTPS的提供服务
            open: true, // 自动打开浏览器
            port: 8888, // 指定要监听请求的端口号
            clientLogLevel: "silent", // 关闭打包时 控制台上面的输出
            // 代理URL(可以在同域名下发送API请求)
            proxy: {
                "/api": {
                    // 请求到 /api/users 会被代理到请求 http://localhost:8888/api/users
                    target: "http://localhost:8888",
                    // 默认情况下不接受运行在https上，且使用了无效证书的后端服务器，想要接受的话可以开启
                    secure: true,
                    // 省去传递/api的前缀 重写路径
                    pathRewrite: {
                        "^/api": ""
                    }
                }
            },
        },
    })
}