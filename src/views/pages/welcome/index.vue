//*欢迎组件
<template>
    <div class="page page-center">
        <div class="welcome-box shineShadow">
            <h1>欢迎进入大🐖🐖的后台系统</h1>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
        }
    },
}
</script>
<style lang="scss" scoped>
.page-center {
    justify-content: center;
    align-items: center;
    background-color: pink;
    .welcome-box {
        padding: 20px;
        border: 3px solid cyan;
        border-radius: 4px;
        box-shadow: 0 0 0 3px #cdfbff;
        h1 {
            text-shadow: 10px 10px rgba(201, 165, 165, 0.3);
        }
    }
    @keyframes shineShadow {
        from {
            box-shadow: 0 0 0 3px  #cdfbff;
        }
        50% {
            box-shadow: 0 0 0 3px transparent
        }
        to {
           box-shadow: 0 0 0 3px #cdfbff
        }
    }
    .shineShadow {
        animation-name: shineShadow;
        animation-duration: 3s;
        animation-iteration-count: infinite
    }
}
</style>
