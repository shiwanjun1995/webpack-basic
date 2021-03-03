import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        user: {},
    },
    mutations: {
        setUser(state, data) {
            state.user = data
        },
    },
    actions: {},
})

export default store