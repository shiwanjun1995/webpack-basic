// 引入vue
import Vue from 'vue'
// 引入vue-router
import VueRouter from 'vue-router'
// console.log('❤️❤️',Vue);
import Hello from '@/components/Hello.vue'
import App from '@/App.vue'

import '@/assets/css/index.scss'

// 全局注册的行为必须在根 Vue 实例 (通过 new Vue) 创建之前发生
import '@/components/index.js'

// 引入elementUi
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.use(VueRouter)

import router from '@/router/index.js'

// 引入iconfont
// import '@/assets/iconfont/iconfont.js'

// 引入mock模拟本地数据
import '@/mock/index.js'

// 引入vuex
import store from '@/store/index.js'

// 引入layout
// import layout from '@/views/layout/index.vue'
new Vue({
    el: '#app',
    router,
    store,
    // 不需要编译器
    render: h => h(App),
    // 需要编译器 (挂载到一个元素上并以其 DOM 内部的 HTML 作为模板))
    // template: '<Hello></Hello>'
}).$mount('#app')