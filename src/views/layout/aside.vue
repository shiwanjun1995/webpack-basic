<template>
    <div class="aside-bar">
        <div class="bar-logo">
            <img v-if="!$isCollapse" src="@/assets/images/aside/1.jpg">
            <img v-else src="@/assets/images/aside/2.jpg">
        </div>
        <el-scrollbar>
            <el-menu class="el-menu-vertical" :collapse="$isCollapse">
                <el-submenu v-for="(item, index) in menuList" :key="index" :index="`${item.id}`">
                    <template slot="title">
                       <i :class="item.icon"></i>
                       <span slot="title">{{ item.authName }}</span>
                    </template>
                    <el-menu-item v-for="(itemC, indexC) in item.children" :key="indexC" :index="`${itemC.id}`"
                        @click="$router.push({ path: itemC.path, query: { name: itemC.authName } })">
                        {{ itemC.authName }}
                    </el-menu-item>
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
            menuList: []
        };
    },
    computed: {
        ...mapState(['$isCollapse', '$user'])
    },
    created() {
        this.setMenuIcon()
    },
    methods: {
        setMenuIcon() {
            this.menuList = this.$user.menus
            const classObj = {
                0: 'c1',
                1: 'c2',
                2: 'c3',
            }
            for (let i = 0; i < this.menuList.length; i++) {
                const className = classObj[i]
                this.menuList[i].icon = `${this.menuList[i].icon} ${className}`
            }
        }
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
