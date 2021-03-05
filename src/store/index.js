import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        $user: {},
        $isCollapse: false,
    },
    mutations: {
        setUser(state, data) {
            state.$user = data
        },
        switchCollapse(state, boolean) {
            state.$isCollapse = boolean
        },
    },
    actions: {},
})

export default store