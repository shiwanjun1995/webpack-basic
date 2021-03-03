<template>
    <div class="header-bar">
        <div class="bar-left">
            <i class="el-icon-s-fold"></i>
            <!-- <i class="el-icon-s-unfold"></i> -->
        </div>
        <div class="bar-right">
            <div class="item">
                <i class="el-icon-user"></i>
                <span>管理员</span>
            </div>
            <div class="item">
                <i class="el-icon-switch-button"></i>
                <span>退出登录</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
        }
    }
}
</script>

<style lang='scss' scoped>
.header-bar {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .bar-left {
        i {
            font-size: 20px;
            cursor: pointer;
        }
    }
    .bar-right {
        display: inline-flex;
        .item {
            margin: 0 5px;
            &:nth-last-of-type(1) {
                cursor: pointer;
            }
            &:nth-last-of-type(1):hover {
                color: #23B7E5;
            }
            i {
                font-size: 16px;
            }
        }
    }
}
</style>
