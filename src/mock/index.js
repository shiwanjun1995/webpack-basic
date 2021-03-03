// 使用 Mock
const Mock = require('mockjs')

// 指定被拦截的Ajax请求的响应时间， 单位是毫秒
Mock.setup({
    timeout: '500-1000'
})

// 获取Random对象
const Random = Mock.Random

// 用户信息
const users = [
    {
        id: 1,
        username: 'admin',
        password: 'admin',
        token: 'abcdefghijklmnopqrstuvwxyz',
        description: '超级管理员，具备所有页面的权限',
        rolename: 'ADMIN',
        rights: [],
    },
    {
        id: 2,
        username: 'visitor',
        password: 'visitor',
        token: 'abcdefghijklmnopqrstuvwxyz'.split('').reverse().join(''),
        description: '游客，仅仅具备查看所有页面的权限',
        rolename: 'VISITOR',
        rights: [],
    },
]

/**
 * 权限信息
 * 将权限信息从用户信息中抽离出来 不同身份对应不同的路由信息
 * 便于后期维护 否则以后每添加一个页面就需要在用户信息中做修改 十分不便 如果用户一多 维护起来很麻烦
 * 将用户直接分为不同的身份 然后对不同身份做处理
*/
const roles = {
    visitor: [
        {
            id: 11,
            authName: '一级菜单',
            icon: 'el-icon-connection',
            children: [
                {
                    id: 111,
                    authName: '表格页面',
                    icon: 'el-icon-s-grid',
                    path: 'table',
                    rights: ['view']
                },
                {
                    id: 112,
                    authName: '素材页面',
                    icon: 'el-icon-s-marketing',
                    path: 'image',
                    rights: ['view']
                }
            ]
        }
    ],
    admin: [
        {
            id: 11,
            authName: '一级菜单',
            icon: 'el-icon-connection',
            children: [
                {
                    id: 111,
                    authName: '表格页面',
                    icon: 'el-icon-s-grid',
                    path: 'table',
                    rights: ['view', 'edit', 'add', 'delete']
                },
                {
                    id: 112,
                    authName: '素材页面',
                    icon: 'el-icon-s-marketing',
                    path: 'image',
                    rights: ['view', 'edit', 'add', 'delete']
                }
            ]
        },
        {
            id: 22,
            authName: '用户权限',
            icon: 'el-icon-set-up',
            children: [
                {
                    id: 221,
                    authName: '权限页面',
                    icon: 'el-icon-s-custom',
                    path: 'users',
                    rights: ['view', 'edit', 'add', 'delete']
                }
            ]
        },
    ]
}

/**
 * Mock.mock( rurl, rtype, function( options ) )
 * rurl 需要拦截的url
 * rtype 需要拦截的ajax请求类型
 * function( options ) 用于生成响应数据的函数
 * 记录用于生成响应数据的函数。当拦截到匹配 rurl 和 rtype 的 Ajax 请求时，函数 function(options) 将被执行，并把执行结果作为响应数据返回。
 */

// 用户登录
Mock.mock('/login', 'post', options => {
    const {userName, userPassword} = JSON.parse(options.body)
    const user = users.find(item => {
        return item.username === userName && item.password === userPassword
    })
    return user
})

var data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|1-10': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1
    }]
})
// 输出结果
console.log(JSON.stringify(data, null, 4))