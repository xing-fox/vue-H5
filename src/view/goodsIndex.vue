<style lang="less" scoped>
  .page{
    width: 100%;
    height: 100%;
    position: relative;
    .searchGoods{
      width: 100%;
      height: .45rem;
      line-height: .45rem;
      background: #fff;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1;
      border-bottom: 1px solid #eee;
      display: flex;
      input{
        flex: 1;
        border: none;
        -webkit-appearance: none;
        color: #333;
        font-size: .13rem;
        height: .3rem;
        line-height: .13rem;
        margin: .075rem .1rem;
        padding: 0 0 0 .3rem;
        border-radius: .15rem;
        background: #f0f0f0;
        overflow: hidden;
      }
      i{
        width: .3rem;
        height: .3rem;
        position: absolute;
        top: 0.075rem;
        left: .1rem;
        background-image: url('../images/icon/search.png');
        background-size: 60% 60%;
        background-repeat: no-repeat;
        background-position: center center;
      }
      span{
        color: #333;
        font-size: .15rem;
        margin: 0 .1rem 0 0;
      }
    }
    .newProBox{
      width: 100%;
      position: absolute;
      top: .45rem;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
      overflow: scroll;
      .newProduct{
        font-size: 0;
        width: 100%;
        margin: 0 0 .1rem 0;
        img{
          width: 100%;
        }
        .proInduce{
          color: #333;
          font-size: .14rem;
          height: .4rem;
          line-height: .4rem;
          padding: 0 0 0 .1rem;
          background: #fff;
        }
      }
    }
  }
</style>

<template>
  <div class="page">
    <div v-wechat-title="$route.meta.title"></div>
    <div class="searchGoods">
      <input type="text" placeholder="搜索商品" @focus="focusFunc" @input="changeFunc" v-model="searchVal" />
      <i class="icon"></i>
      <span v-if="searCloseStatus" @click="blurFunc">取消</span>
    </div>
    <div class="newProBox" @scroll.stop.prevent="scrollFunc" ref="goodsBox" v-show="!searCloseStatus">
      <div class="newProduct" v-for="(item, index) in dataList" :key="index" @click="changeDetails(item.product_id)">
        <img :src="item.new_picture" mode="widthFix">
        <div class="proInduce">{{ item.new_name }}</div>
      </div>
      <templeList :datalist="newData"></templeList>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import templeList from '@/components/yhtempIntro'
export default {
  name: 'goodsIndex',
  data () {
    return {
      pagNo: 1,
      openId: '',
      newData: [],
      dataFlag: true, // 下滑状态
      dataList: [],
      searchVal: '',
      searCloseStatus: false
    }
  },
  components: {
    templeList
  },
  mounted () {
    /**
     * 登录接口信息
     */
    let self = this
    self.openId = 'o4FLT1SX1uTrpIbl010Y7GG9CWRE'
    window.localStorage.setItem('openId', 'o4FLT1S5omU0ocpWy7PgNoNWYgGA')
    self.LoadingingStatus(true)
    self.$http.Wxlogin({
      code: window.localStorage.getItem('Code') || ''
    }).then(res => {
      self.LoadingingStatus(false)
      if (res.success) {
        self.openId = res.content.pub_openid
        // window.localStorage.setItem('openId', res.content.pub_openid)
      }
      window.localStorage.setItem('shareUrl', location.href.split('#')[0])
    }).then(() => {
      this.init()
    })
  },
  methods: {
    ...mapActions([
      'LoginingStatus',
      'LoadingingStatus'
    ]),
    init () {
      this.$http.Allproduct({
        data: JSON.stringify({
          pag_no: 1,
          pag_num: 5
        }),
        'openid': this.openId
      }).then(res => {
        this.dataList = res.content.data
      })
      this.allProduct()
    },
    allProduct () {
      let self = this
      this.$http.CJJX({
        data: JSON.stringify({
          pag_no: self.pagNo,
          pag_num: 8
        }),
        'openid': this.openId
      }).then(res => {
        this.dataFlag = SVGFETurbulenceElement
        this.newData = this.newData.concat(res.content.data)
        if (res.content.data.length < 8) {
          this.dataFlag = false
        }
      })
    },
    scrollFunc () {
      if (this.$refs.goodsBox.scrollTop + document.body.clientHeight + 50 > this.$refs.goodsBox.scrollHeight && this.dataFlag) {
        this.pagNo++
        this.dataFlag = false
        this.allProduct()
      }
    },
    focusFunc () {},
    changeFunc () {},
    blurFunc () {},
    changeDetails (id) {}
  }
}
</script>
