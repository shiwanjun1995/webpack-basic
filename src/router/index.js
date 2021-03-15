import VueRouter from 'vue-router'
import store from '@/store/index.js'

const routerMap = {
    '/menu/one': { path: 'menu/one', component: () => import('@/views/pages/menu/one.vue')},
    '/menu/two': { path: 'menu/two', component: () => import('@/views/pages/menu/two.vue')},
    '/menu/three': { path: 'menu/three', component: () => import('@/views/pages/menu/three.vue')},
    '/menu/four': { path: 'menu/four', component: () => import('@/views/pages/menu/four.vue')},
    '/menu/five': { path: 'menu/five', component: () => import('@/views/pages/menu/five.vue')},
}

const router = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/welcome',
        },
        {
            path: '',
            name: 'layout',
            component: () => import('@/views/layout/index.vue'),
            children: [
                {
                    path: '/welcome',
                    component: () => import('@/views/pages/welcome/index.vue'),
                },
                {
                    path: '/login',
                    component: () => import('@/views/pages/login/index.vue'),
                    meta: {
                        hideBar: true
                    },
                },
            ]
        },
        {
            path : "*", // 用户输入的URL路由地址是没有的 给个默认的地址
            redirect: '/welcome'
        },
    ]
})

router.$addRoutes = (params) => {
    router.matcher = new VueRouter().matcher; // reset router
    router.addRoutes(params)
}

export const initDynamicRouter = () => {
    const routes =  router.options.routes
    const route = routes.find(item => item.name === 'layout')
    const { menus = [] } = store.state.$user
    // 根据二级权限 对路由规则进行动态添加
    menus.forEach(i => {
        i.children.forEach(j => {
            const temp = routerMap[j.path]
            // 路由规则中添加元数据
            temp.meta = j.rights
            route.children.push(temp)
        })
    })
    router.$addRoutes(routes)
}

router.beforeEach((to, from, next) => {
    if (sessionStorage.getItem('login') === 'yes') {
        next()
    } else {
        if (to.path == '/login') {
            next()
        } else {
            next({ path: '/login' })
        }
    }
})

// 解决 重复点击路由出现的控制台报错 禁止全局的路由错误处理
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
    return originalPush.call(this, location).catch(err => err)
}

export default router