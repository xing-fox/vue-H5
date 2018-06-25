<template>
  <div class='page'>
    <div v-wechat-title="$route.meta.title"></div>
    <div class="pageIndex">
      <ul>
        <li v-for="(item, index) in addrList" class="active" :key="index">
          <div class="content">
            <div class="contName">{{ item.receiver_name }} ({{ item.receiver_phone }})</div>
            <div class="contAddr">
              <span v-if="item.address_flag == '1'">[默认地址]</span>
              {{ item.receiver_area }}{{ item.detail_address }}
            </div>
          </div>
        </li>
      </ul>
      <div class="noData" v-if="noData">
        <NoData></NoData>
      </div>
      <div class="addManager" @click="managerFunc">
        <span>管理地址</span>
      </div>
    </div>
  </div>
</template>

<script>
import NoData from '@/components/nodata'
export default {
  data () {
    return {
      noData: '',
      listFlag: -1,
      addrList: []
    }
  },
  components: {
    NoData
  },
  methods: {
    managerFunc () {
      this.$router.push({
        path: '/wechat_pub/addrManager'
      })
    }
  },
  created () {
    let self = this
    self.noData = false
    self.addrList = []
    self.$http.myAddress({
      'openid': window.localStorage.getItem('openId')
    }).then(res => {
      if (res.content === null) {
        self.noData = true
      }
      if (res.code === 'E00000' && res.content.length) {
        self.addrList = res.content
        self.addrList.map((item, index) => {
          if (item.address_flag === '1') {
            self.listFlag = index
          }
        })
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
  .page{
    width: 100%;
    height: 100%;
    position: relative;
    background: #f3f5f9;
    .pageIndex,ul{
      width: 100%;
      li{
        width: 100%;
        padding: .1rem 0;
        margin: 0 0 .1rem 0;
        background: #fff;
        display: flex;
        .content{
          flex: 1;
          font-size: .14rem;
          margin: 0 .15rem 0 0;
          .contName{
            color: #333;
            line-height: .25rem;
          }
          .contAddr{
            color: #777;
            line-height: .25rem;
            span{
              color: #ffda44;
            }
          }
        }
        &.active{
          padding: .1rem 0 .1rem .15rem;
        }
      }
    }
    ul{
      padding: 0 0 .6rem 0;
    }
    .noData{
      font-size: 0;
      width: 100%;
      padding: 0.2rem 0 0 0;
      background: #fff;
      position: absolute;
      top: 0;
      bottom: .55rem;
      left: 0;
      right: 0;
      z-index: 1;
      overflow: hidden;
    }
    .addManager{
      color: #222;
      font-size: .16rem;
      width: 100%;
      height: .55rem;
      line-height: .55rem;
      text-align: center;
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      background: #ffda44;
    }
  }
</style>
