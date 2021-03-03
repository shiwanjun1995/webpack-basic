//*欢迎组件
<template>
    <div class="welcome-container">
        <h1>欢迎进入我的后台系统</h1>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data () {
        return {
        }
    },
    computed: {
        ...mapState(['user'])
    },
    created() {
        console.log('✔️✔️✔️',this.user);
    },
}
</script>

<style lang='scss' scoped>
.welcome-container {
    height: 100%;
    background-color: #fc0;
}
</style>
