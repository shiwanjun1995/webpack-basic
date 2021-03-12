<template>
    <div class="aside-bar">
        <div class="bar-logo">
            <img v-if="!$isCollapse" src="@/assets/images/aside/1.jpg">
            <img v-else src="@/assets/images/aside/2.jpg">
        </div>
        <el-scrollbar>
            <el-menu class="el-menu-vertical" :collapse="$isCollapse">
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-menu c1"></i>
                        <span slot="title">导航一</span>
                    </template>
                    <el-menu-item @click="$router.push({ path: '/menu/one', query: { name: '菜单栏1' }})">菜单栏1</el-menu-item>
                    <el-menu-item @click="$router.push({ path: '/menu/two', query: { name: '菜单栏2' }})">菜单栏2</el-menu-item>
                    <el-menu-item @click="$router.push({ path: '/menu/three', query: { name: '菜单栏3' }})">菜单栏3</el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-document c2"></i>
                        <span slot="title">导航二</span>
                    </template>
                    <el-menu-item @click="$router.push({ path: '/menu/four', query: { name: '菜单栏4' }})">菜单栏4</el-menu-item>
                    <el-menu-item @click="$router.push({ path: '/menu/five', query: { name: '菜单栏5' }})">菜单栏5</el-menu-item>
                </el-submenu>
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
        };
    },
    computed: {
        ...mapState(['$isCollapse'])
    },
    methods: {

    },
};
</script>

<style lang='scss' scoped>
.aside-bar {
    height: 100%;
    background-color: skyblue;
    .bar-logo {
        display: flex;
        justify-content: center;
    }
    .el-submenu__title {
        color: #fff;
        i {
            &.c1{
                color: rgb(23, 151, 190) !important;
            }
            &.c2{
                color: rgb(81, 198, 234) !important;
            }
            &.c3{
                color: rgb(39, 194, 76) !important;
            }
        }
    }
    .el-menu {
        border-right: 0px;
    }
    // 解决 多次点击导航栏会复制文字
    .el-menu-item {
        user-select: none;
    }
    // 解决 折叠和收缩侧边导航栏文字卡顿
    .el-menu-vertical:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
}
</style>
