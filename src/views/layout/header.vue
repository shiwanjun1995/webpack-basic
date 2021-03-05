<template>
    <div class="header-bar">
        <div class="bar-left" @click="onSwitchCollapse">
            <i :class="$isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold'"></i>
        </div>
        <div class="bar-right">
            <div class="item">
                <i class="el-icon-user"></i>
                <span>{{ $user.username }}</span>
            </div>
            <div class="item" @click="onClickLogOut">
                <i class="el-icon-switch-button"></i>
                <span>退出登录</span>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    data () {
        return {
        }
    },
    computed: {
        ...mapState(['$isCollapse', '$user'])
    },
    methods: {
        ...mapMutations(['switchCollapse']),

        onSwitchCollapse() {
            this.switchCollapse(!this.$isCollapse)
        },
        onClickLogOut() {
            this.$confirm('是否确认退出?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                setTimeout(() => {
                    this.$router.push('/login')
                }, 500);
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                })
            })
        },
    },
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
