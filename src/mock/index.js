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
        rights: [
            {
                id: 11,
                authName: '一级菜单',
                icon: 'el-icon-connection',
                children: [
                    {
                        id: 111,
                        authName: '一级项目1',
                        icon: 'el-icon-s-grid',
                        path: '/menu/one',
                        rights: ['view', 'edit', 'add', 'delete']
                    },
                    {
                        id: 112,
                        authName: '一级项目2',
                        icon: 'el-icon-s-marketing',
                        path: '/menu/two',
                        rights: ['view', 'edit', 'add', 'delete']
                    }
                ]
            },
            {
                id: 22,
                authName: '二级菜单',
                icon: 'el-icon-set-up',
                children: [
                    {
                        id: 221,
                        authName: '二级项目1',
                        icon: 'el-icon-s-custom',
                        path: '/menu/three',
                        rights: ['view', 'edit', 'add', 'delete']
                    },
                    {
                        id: 222,
                        authName: '二级项目2',
                        icon: 'el-icon-s-custom',
                        path: '/menu/four',
                        rights: ['view', 'edit', 'add', 'delete']
                    },
                    {
                        id: 223,
                        authName: '二级项目2',
                        icon: 'el-icon-s-custom',
                        path: '/menu/five',
                        rights: ['view', 'edit', 'add', 'delete']
                    },
                ]
            },
        ],
    },
    {
        id: 2,
        username: 'visitor',
        password: 'visitor',
        token: 'abcdefghijklmnopqrstuvwxyz'.split('').reverse().join(''),
        description: '游客，仅仅具备查看所有页面的权限',
        rolename: 'VISITOR',
        rights: [
            {
                id: 11,
                authName: '一级菜单',
                icon: 'el-icon-connection',
                children: [
                    {
                        id: 111,
                        authName: '一级项目1',
                        icon: 'el-icon-s-grid',
                        path: '/menu/one',
                        rights: ['view']
                    },
                    {
                        id: 112,
                        authName: '一级项目2',
                        icon: 'el-icon-s-marketing',
                        path: '/menu/two',
                        rights: ['view', 'edit', 'add', 'delete']
                    }
                ]
            },
        ],
    },
]

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
