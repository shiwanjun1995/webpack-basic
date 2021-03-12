<template>
    <div class="layout-wrapper">
        <el-container>
            <el-aside v-if="!$route.meta.hideBar" :style="{ width: $isCollapse? '64px' : '200px' }">
                <v-aside></v-aside>
            </el-aside>
            <el-container class="v-container">
                <el-header v-if="!$route.meta.hideBar">
                    <v-header></v-header>
                </el-header>
                <el-main>
                    <div class="layout">
                        <router-view></router-view>
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import vHeader from './header.vue'
import vAside from './aside.vue'
export default {
    components: {
        vHeader,
        vAside,
    },
    data () {
        return {
        }
    },
    computed: {
        ...mapState(['$isCollapse'])
    },
}
</script>

<style lang='scss' scoped>
.layout-wrapper,
.el-container {
    height: 100%;
}
.el-header {
    width: 100%;
    height: 40px !important;
}
.el-aside {
    transition: all 0.3s;
}
.el-main {
    padding: 0px;
}
.v-container {
    flex-direction: column;
}
.layout {
    height: 100%;
}
</style>
