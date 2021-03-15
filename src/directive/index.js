import Vue from 'vue'
import router from '@/router/index.js'

Vue.directive('permit', {
    inserted(el, binding) {
        // 增删改查的动作
        const action = binding.value.action
        const effect = binding.value.effect
        // 判断当前路由所对应的组件中 当前用户是否具备 action 的权限

        // 当前组件所属于的路由规则
        const currentRouteRule = router.currentRoute
        if (!currentRouteRule.meta.includes(action)) {
            if (effect === 'disabled') {
                el.disabled = true
                // element 环境下需要加这个类
                el.classList.add('is-disabled')
            } else {
                // 默认删除
                el.parentNode.removeChild(el)
            }
        }
    },
})