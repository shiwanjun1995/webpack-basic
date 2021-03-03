<template>
    <div class="layout-wrapper">
        <el-container>
            <el-aside>Aside</el-aside>
            <el-container>
                <el-header>
                    <v-header></v-header>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import vHeader from './header.vue'
export default {
    components: {
        vHeader,
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
    background-color:cyan;
}
</style>
