import VueRouter from 'vue-router'

const router = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/welcome',
        },
        {
            path: '',
            component: () => import('@/views/layout/index.vue'),
            children: [
                {
                    path: '/menu/one',
                    component: () => import('@/views/pages/menu/one.vue'),
                },
                {
                    path: '/menu/two',
                    component: () => import('@/views/pages/menu/two.vue'),
                },
                {
                    path: '/menu/three',
                    component: () => import('@/views/pages/menu/three.vue'),
                },
                {
                    path: '/menu/four',
                    component: () => import('@/views/pages/menu/four.vue'),
                },
                {
                    path: '/menu/five',
                    component: () => import('@/views/pages/menu/five.vue'),
                },
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
        // {
        //     path : "*", // 用户输入的URL路由地址是没有的 给个默认的地址
        //     redirect: '/welcome'
        // },
    ]
})


export default router