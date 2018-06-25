import Vue from 'vue'
import Vuex from 'vuex'

import Loading from './modules/loading'
import Login from './modules/login'
import WxLogin from './modules/wxlogin'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Loading,
    Login,
    WxLogin
  },
  strict: process.env.NODE_ENV !== 'production'
})
