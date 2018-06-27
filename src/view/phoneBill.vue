<template>
  <div class="all">
    <div class="title">
      <div class="phone"><input type="tel" v-model="phoneNum" placeholder="请输入手机号"  v-on:input ="inputFunc"/></div>
      <div class="info">当前充值手机号</div>
    </div>
    <div class="content">
      <div class="money">
        <ul>
          <li v-for="(item, index) in moneyList" :key="index"  @click="getMoney(item,index)"  :class="{ active:activeIndex == index}" >{{ item.order_name }}</li>
        </ul>
      </div>
      <div class="pay">
        <p>需付款</p>
        <span>¥{{ priceCount }}</span>
      </div>
      <div class="bottom">
        <span @click="payMoney">充值</span>
      </div>
    </div>
  </div>
</template>
<script>
import wx from 'wx'
import { mapActions } from 'vuex'
export default {
  name: 'PhoneBill',
  data () {
    return {
      openId: window.localStorage.getItem('openId'),
      phoneNum: '',
      priceCount: 0,
      moneyList: [],
      type: '',
      payType: this.$route.query.payType, // 充值类型 0 话费 1 流量
      parameter_id: '',
      activeIndex: -1
    }
  },
  watch: {
    '$route' (to, from) {
      this.init()
      this.shareWx()
      if (this.payType === 0) {
        this.costInit()
      }
    }
  },
  created () {
    this.init()
    this.shareWx()
    if (this.payType === 0) {
      this.costInit()
    }
  },
  methods: {
    ...mapActions(['LoadingingStatus']),
    init () { // 初始化获取手机号
      this.LoadingingStatus(true)
      this.$http.getPhoneNumByOpenid({
        openid: this.openId
      }).then(res => {
        this.LoadingingStatus(false)
        if (res.success && res.content) {
          this.phoneNum = res.content.phone
          if (this.payType === 1 && this.phoneNum) {
            this.getPhoneInit()
          }
        }
      })
    },
    costInit () { // 查询话费充值套餐
      let that = this
      this.$http.getMoneylist({
        data: JSON.stringify({
          type: '0'
        })
      }).then(res => {
        this.moneyList = []
        if (res.success && res.content) {
          for (let i = 0; i < res.content.length; i++) {
            that.moneyList.push(res.content[i])
          }
        }
      })
    },
    flowInit () { // 查询流量充值套餐
      let that = this
      this.$http.getMoneylist({
        data: JSON.stringify({
          type: '1',
          operator: that.type
        })
      }).then(res => {
        this.moneyList = []
        if (res.success && res.content) {
          for (let i = 0; i < res.content.length; i++) {
            that.moneyList.push(res.content[i])
          }
        }
      })
    },
    inputFunc () { // 充值流量 输入前三位
      if (this.payType === 1) {
        if (this.phoneNum.length === 3) {
          this.$http.judgePhoneNum().then(res => {
            if (res.success && res.content) {
              this.type = res.content.obj[this.phoneNum]
              this.flowInit()
            }
          })
        }
      }
    },
    getPhoneInit () { // 默认手机号截取三位查询运营商
      let number = this.phoneNum.substring(0, 3)
      this.$http.judgePhoneNum({}).then(res => {
        if (res.success && res.content) {
          this.type = res.content.obj[number]
          this.flowInit()
        }
      })
    },
    getMoney (item, index) { // 获取金额
      this.priceCount = item.product_price
      this.parameter_id = item.parameter_id
      this.activeIndex = index
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
          appId: self.$global.appId,
          timestamp: response.content.timestamp,
          nonceStr: response.content.noncestr,
          signature: response.content.signature,
          jsApiList: ['chooseWXPay']
        })
        wx.ready(function () {})
      })
    },
    payMoney () { // 充值
      let self = this
      var myreg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (!myreg.test(this.phoneNum)) {
        self.$toast('请输入正确的手机号')
        return false
      }
      if (this.priceCount === 0) {
        self.$toast('请选择充值金额')
        return false
      }
      // 创建订单
      let that = this
      this.$http.createOrder({
        data: JSON.stringify({
          phone: that.phoneNum,
          type: that.payType,
          parameter_id: that.parameter_id
        }),
        openid: this.openId
      }).then(res => {
        if (res.success && res.content) {
          this.mobliePay(res.content.order_no)
        }
      })
    },
    mobliePay (orderNo) {
      let that = this
      this.$http.pay({
        data: JSON.stringify({
          order_no: orderNo,
          type: that.payType,
          pay_way: '1',
          coupon_flag: '0'
        }),
        openid: that.openId,
        payfrom: 'wxpub'
      }).then(res => {
        if (res.success && res.content) {
          wx.chooseWXPay({
            appId: that.$global.appId,
            timestamp: res.content.timestamp,
            nonceStr: res.content.noncestr,
            package: res.content.wxpay_package,
            signType: 'MD5',
            paySign: res.content.sign,
            success: function (res) {
              that.$router.push({
                path: '/wechat_pub/mobileService'
              })
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.all {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background: #f3f5f7;
  .title {
    background: #ffffff;
    width: 100%;
    height: 0.73rem;
    .phone {
      font-size: 20px;
      color: #000;
      margin: 0 0px 3px 0;
      padding: .1rem 0 .04rem 0;
      input {
        -webkit-appearance: none;
        color: #666;
        font-size: 0.2rem;
        border: none;
        width: 100%;
        height: 0.29rem;
        outline: none;
        padding: 0 0 0 0.1rem;
        margin-left: 0rem;
      }
    }
    .info {
      font-size: 0.14rem;
      color: #999999;
      margin: 0 0 0.03rem 0.15rem;
    }
  }
  .content {
    width: 100%;
    margin-top: 5px;
    background: #ffffff;
    height: 5.4rem;
    .money {
      width: 100%;
      ul {
        display: flex;
        flex-wrap: wrap;
        padding-top: 0.43rem;
      }
      ul li {
        font-size: 0.18rem;
        color: #333333;
        border: 1px solid #cccccc;
        height: 0.61rem;
        width: 1.1rem;
        margin: 0 0.05rem 0.15rem 0.07rem;
        text-align: center;
        line-height: 0.61rem;
        border-radius: 0.05rem;
        &.active {
          background-color: #ffda44;
        }
      }
    }
    .pay {
      margin-top: 0.47rem;
      display: flex;
      p {
        flex: 1;
        font-size: 0.14rem;
        margin: 0 0 0 .15rem;
        vertical-align: middle;
      }
      span {
        color: #ff5959;
        font-size: 0.2rem;
        margin: 0 .15rem 0 0;
        vertical-align: middle;
      }
    }
    .bottom span {
      width: 100%;
      height: 0.51rem;
      background: #ffda44;
      line-height: 0.51rem;
      font-size: 0.16rem;
      color: #222222;
      letter-spacing: 0.61px;
      text-align: center;
      position: fixed;
      bottom: 0;
    }
  }
}
</style>
