import Api from '@/fetch/api'

let state = {
  wxLogin: false
}
const actions = {
  Wx_LoginingStatus ({ commit }, id) {
    Api.Wxlogin({
      code: id || ''
    }).then(res => {
      if (res.success) {
        console.log('success')
        commit('WxLogining')
        window.localStorage.setItem('openId', res.content.pub_openid)
      }
      window.localStorage.setItem('shareUrl', location.href.split('#')[0])
      if (!res.success) {
        console.log('fail')
      }
    }).catch(err => {
      console.log('err')
      console.log(err)
    })
  }
}
const mutations = {
  WxLogining (state) {
    state.wxLogin = true
  }
}
const getters = {
}
export default {
  state,
  getters,
  actions,
  mutations
}
