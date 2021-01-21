// 引入vue
import Vue from 'vue'
// console.log('❤️❤️',Vue);
import Hello from '@/components/Hello.vue'

import login from '@/views/login/index.vue'

new Vue({
    // 不需要编译器
    render: h => h(login)

    // 需要编译器 (挂载到一个元素上并以其 DOM 内部的 HTML 作为模板))
    // template: '<Hello></Hello>'
}).$mount('#app')