// 引入vue
import Vue from 'vue'
// console.log('❤️❤️',Vue);
import Hello from '@/components/Hello.vue'

import login from '@/views/login/index.vue'
import '@/assets/css/index.scss'

// 全局注册的行为必须在根 Vue 实例 (通过 new Vue) 创建之前发生
import '@/components/index.js'

// 引入elementUi
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

// 引入iconfont
// import '@/assets/iconfont/iconfont.js'

new Vue({
    // 不需要编译器
    render: h => h(login)

    // 需要编译器 (挂载到一个元素上并以其 DOM 内部的 HTML 作为模板))
    // template: '<Hello></Hello>'
}).$mount('#app')