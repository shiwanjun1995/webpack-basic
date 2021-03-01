import VueRouter from 'vue-router'

const router = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/welcome',
        },
        {
            path: '/welcome',
            component: () => import('@/views/welcome/index.vue'),
        },
        // {
        //     path : "*", // 用户输入的URL路由地址是没有的 给个默认的地址
        //     redirect: '/welcome'
        // },
        {
            path: '/login',
            component: () => import('@/views/login/index.vue'),
        }
    ]
})


export default router