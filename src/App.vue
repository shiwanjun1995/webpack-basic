<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
import { initDynamicRouter } from '@/router/index.js'
export default {
    name: 'App',
    data() {
        return {}
    },
    created() {
        initDynamicRouter()
    },
}
</script>

<style lang="scss" scoped>
#app {
    width: 100%;
    height: 100%;
}
</style>