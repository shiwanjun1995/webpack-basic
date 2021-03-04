<template>
    <div class="layout-wrapper">
        <el-container>
            <el-aside v-if="!$route.meta.hideBar">
                <v-aside></v-aside>
            </el-aside>
            <el-container>
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
    }
}
</script>

<style lang='scss' scoped>
.layout-wrapper,
.el-container {
    height: 100%;
}
.el-aside {
    width: 200px !important;
    background-color: #eee;
}
.el-main {
    padding: 0px;
    background-color:cyan;
}
.layout {
    height: 100%;
}
</style>
