// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import store from '@/store'
import router from './router'
import http from '@/fetch/api'
import fastclick from 'fastclick'
import {Alert, Confirm, Toast} from 'wc-messagebox'
import 'wc-messagebox/style.css'
import 'url-search-params-polyfill'
Vue.use(Alert, {})
Vue.use(Confirm, {})
Vue.use(Toast, {})

/**
 * 测试appid
 */
Vue.prototype.$appId = 'wx8b6bb04ed1ac3b29'
/**
 * 生产appid
 */
// Vue.prototype.$appId = 'wxa5b9d93b9a8d3283'
Vue.prototype.$http = http
Vue.prototype.axios = axios
Vue.config.productionTip = false

Vue.config.debug = true
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', () => {
    fastclick.attach(document.body)
  }, false)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
