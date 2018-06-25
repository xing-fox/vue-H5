<template>
  <div id="app">
    <Login v-if="LoginShow"></Login>
    <Loading v-if="LoadingShow"></Loading>
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Login from '@/components/login'
import Loading from '@/components/loading'
export default {
  name: 'App',
  components: {
    Login,
    Loading
  },
  created () {
    window.localStorage.removeItem('Code')
    window.localStorage.setItem('Code', this.getQueryString('code'))
  },
  computed: {
    ...mapState({
      LoginShow: state => state.Login.LoginState,
      LoadingShow: state => state.Loading.LoadingState
    })
  },
  methods: {
    getQueryString (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
      var r = window.location.search.substr(1).match(reg)
      if (r != null) return unescape(r[2])
      return null
    }
  }
}
</script>

<style lang='less'>
@import 'assets/css/reset.less';
#app{
  width: 100%;
  height: 100%;
}
a:hover{
  background: none;
}
.boxOrent{
  // eslint-disable-next-line
  /*! autoprefixer: off */
  -webkit-box-orient: vertical;
  /* autoprefixer: on */
}
</style>
