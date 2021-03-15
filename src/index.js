// 引入vue
import Vue from 'vue'
// 引入vue-router
import VueRouter from 'vue-router'
import App from '@/App.vue'

import '@/assets/css/index.scss'

// 全局注册的行为必须在根 Vue 实例 (通过 new Vue) 创建之前发生
import '@/components/index.js'

// 引入自定义指令
import '@/directive/index.js'

// 引入elementUi
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.use(VueRouter)

import router from '@/router/index.js'

// 引入iconfont
import '@/assets/iconfont/iconfont.js'

// 引入mock模拟本地数据
import '@/mock/index.js'

// 引入vuex
import store from '@/store/index.js'

new Vue({
    el: '#app',
    router,
    store,
    // 不需要编译器
    render: h => h(App),
}).$mount('#app')