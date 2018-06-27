<template>
    <div class="all">
        <div class="page">
            <div v-wechat-title="$route.meta.title"></div>
            <div class="header">
                <ul @click="add(0)">
                    <li><img src="../images/icon/home_ico_cost@2x.png"/><li>
                    <li><div>充话费</div></li>
                </ul>
                <ul @click="add(1)">
                    <li><img src="../images/icon/home_ico_flow@2x.png"/><li>
                    <li><div>充流量</div></li>
                </ul>
                <ul @click="getBillList()">
                    <li><img src="../images/icon/home_ico_bill@2x.png"/><li>
                    <li><div>查账单</div></li>
                </ul>
            </div>
            <div class="content">
                <div class="mobileList">
                    <div class="title">
                        <div class="box"></div>
                        <span class="plan">移动套餐</span>
                        <span class="arrow"><img src="../images/icon/rightJT.png"/></span>
                        <div @click="getAll(1)">全部</div>
                    </div>
                    <ul>
                        <li v-for="(item, index) in mobileList" :key="index">
                            <div>{{ item.contractName }}</div>
                            <img :src= "item.imageUri" @click="showPictureFunc(item.imageUri)">
                        </li>
                    </ul>
                </div>
                <div class="mobileList">
                    <div class="title">
                        <div class="box"></div>
                        <span class="plan">宽带套餐</span>
                        <span class="arrow"><img src="../images/icon/rightJT.png"/></span>
                        <div @click="getAll(2)" >全部</div>
                    </div>
                    <ul>
                        <li v-for="(item, index) in broadbandList" :key="index">
                            <div>{{ item.contractName }}</div>
                            <img :src= "item.imageUri" @click="showPictureFunc(item.imageUri)">
                        </li>
                    </ul>
                </div>
                <div class="mobileList">
                    <div class="title">
                        <div class="box"></div>
                        <span class="plan">裸机优惠</span>
                        <span class="arrow"><img src="../images/icon/rightJT.png"/></span>
                        <div @click="getAll(3)">全部</div>
                    </div>
                    <ul>
                        <li v-for="(item, index) in bareMachine" :key="index">
                            <div>{{ item.contractName }}</div>
                            <img :src= "item.imageUri" @click="showPictureFunc(item.imageUri)">
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <router-view />
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import wx from 'wx'
export default {
  name: 'MobileService',
  data () {
    return {
      openId: '', // openid
      mobileList: [],
      broadbandList: [],
      bareMachine: []
    }
  },
  created () {
    console.log(this.$appId)
    let self = this
    // self.openId = 'o4FLT1S5omU0ocpWy7PgNoNWYgGA'
    // window.localStorage.setItem('openId', 'o4FLT1S5omU0ocpWy7PgNoNWYgGA')
    self.LoadingingStatus(true)
    /**
     * code 登录
     */
    self.$http.Wxlogin({
      code: window.localStorage.getItem('Code') || ''
    }).then(res => {
      if (res.success) {
        self.openId = res.content.pub_openid
        window.localStorage.setItem('openId', res.content.pub_openid)
      }
      window.localStorage.setItem('shareUrl', location.href.split('#')[0])
    }).then(() => {
      self.mobileInit()
      self.shareWx()
    })
  },
  methods: {
    ...mapActions([
      'LoadingingStatus'
    ]),
    mobileInit () {
      this.LoadingingStatus(true)
      let that = this
      function init (arg) {
        that.$http.mobileContractlist({
          'contractTypeId': arg,
          'openid': that.openId
        }).then(res => {
          that.LoadingingStatus(false)
          if (res.success && res.content) {
            if (res.content.length >= 2) {
              for (let i = 0; i < 2; i++) {
                res.content[i].imageUri = 'http://test.xclerk.com/upload/' + res.content[i].imageUri
                if (arg === 1) {
                  that.mobileList.push(res.content[i])
                }
                if (arg === 2) {
                  that.broadbandList.push(res.content[i])
                }
                if (arg === 3) {
                  that.bareMachine.push(res.content[i])
                }
              }
            } else {
              for (let i = 0; i < res.content.length; i++) {
                res.content[i].imageUri = 'http://test.xclerk.com/upload/' + res.content[i].imageUri
                if (arg === 1) {
                  that.mobileList.push(res.content[i])
                }
                if (arg === 2) {
                  that.broadbandList.push(res.content[i])
                }
                if (arg === 3) {
                  that.bareMachine.push(res.content[i])
                }
              }
            }
          }
        })
      }
      init(1)
      init(2)
      init(3)
    },
    add (arg) {
      this.$router.push({path: 'mobileService/phoneBill', query: {payType: arg}})
    },
    isAndroid () {
      let u = window.navigator.userAgent
      return u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
    },
    shareWx () {
      let self = this
      let sendUrl = window.localStorage.getItem('shareUrl')
      if (self.isAndroid()) {
        sendUrl = window.location.href.split('#')[0]
      }
      self.$http.WxgetJs({
        url: sendUrl
      }).then(response => {
        wx.config({
          debug: false,
          appId: 'wx8b6bb04ed1ac3b29',
          timestamp: response.content.timestamp,
          nonceStr: response.content.noncestr,
          signature: response.content.signature,
          jsApiList: ['previewImage']
        })
        wx.ready(function () {})
      })
    },
    showPictureFunc (imageUrl) {
      wx.previewImage({
        current: imageUrl,
        urls: [imageUrl]
      })
    },
    getAll (mobileType) {
      this.$router.push({path: 'mobileService/mobileList', query: {contractTypeId: mobileType}})
    },
    getBillList () {
      this.$router.push({path: 'mobileService/billList'})
    }
  }
}
</script>

<style lang="less" scoped>
.page{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 1;
}
.all{
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  position: relative;
    .header {
        max-width: 900px;
        margin: 0 auto;
        height: 1rem;
        width: 100%;
        background: #FFFFFF;
        overflow: hidden;
        display: flex;
        ul li img{
            width: .45rem;
            height: .45rem;
        }
        ul li div{
           font-size: .14rem;
           color: #222222;
           letter-spacing: 0;
           margin-top: -0.10rem;
        }
        ul{
            flex: 1;
            text-align: center;
            margin-top: -.4rem;
        }
    }
    .content{
        max-width: 900px;
        margin: 0 auto;
        position: absolute;
        top: 1.05rem;
        bottom: 0;
        left: 0;
        right: 0;
        overflow-y: scroll;
        .mobileList{
            background: #FFFFFF;
            width: 100%;
            .title{
                overflow: hidden;
                .box{
                     float: left;
                     background: #55B9EB;
                     width: 0.04rem;
                     height: 0.16rem;
                     margin: .13rem 0 .1rem .1rem;
                }
                .arrow img{
                    float: right;
                    margin: .06rem .05rem 0 0;
                    width: .2rem;
                    height: .25rem;
                }
                .plan{
                    font-size: .16rem;
                    color: #222222;
                    letter-spacing: 0;
                    text-align: left;
                    float: left;
                    margin: .1rem 0 .1rem .05rem;

                }
                div{
                    float: right;
                    font-size: .13rem;
                    color: #999999;
                    letter-spacing: 0;
                    margin: .1rem .01rem .1rem .1rem;
                }
                .icon{
                    float: right;
                    height: .2rem;
                    width: .1rem;
                    margin-right: .1rem;
                }
             }
                ul li div{
                    font-size: .15rem;
                    color: #222222;
                    letter-spacing: 0;
                    text-align: left;
                    margin: .1rem .1rem .05rem .1rem;
                }
                ul li img{
                    margin: .1rem 0 .05rem .2rem;
                    width: 1.88rem;
                    height: 1.05rem;
                }
            }
        }
    }
</style>
