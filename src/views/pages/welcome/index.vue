//*欢迎组件
<template>
    <div class="page">
        <h1>欢迎进入大🐖🐖的后台系统</h1>
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

