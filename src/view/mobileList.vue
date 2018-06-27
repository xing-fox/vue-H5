<template>
    <div class="all">
        <div v-wechat-title="$route.meta.title"></div>
        <div class="content">
            <div class="mobileList">
                <ul>
                    <li v-for="(item, index) in mobileList" :key="index">
                        <div class="header">{{ item.contractName }}</div>
                        <div class="time" v-if="item.createdAt">
                          <i class="timePic"></i><span class="timeValue">{{ item.createdAt }} 开始</span>
                        </div>
                        <img :src= "item.imageUri" @click="showPictureFunc(item.imageUri)">
                        <div class="title" v-if="item.shopName && item.shopMobile">
                          <div class="shopname">{{ item.shopName }}</div>
                          <div class="phone" @click="call(item.shopMobile)">
                            <i class="iph"></i><span>电话</span>
                            </div>
                        </div>
                        <div class="address" v-if="item.shopAddress ">
                          <i class="addr"></i>
                          <span>{{ item.shopAddress }}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import wx from 'wx'
export default {
  name: 'MobileList',
  data () {
    return {
      openId: '', // openid
      mobileList: [],
      contractTypeId: this.$route.query.contractTypeId
    }
  },
  created () {
    this.init()
  },
  methods: {
    ...mapActions([
      'LoadingingStatus'
    ]),
    init () {
      this.LoadingingStatus(true)
      let that = this
      that.$http.mobileContractlist({
        'contractTypeId': that.contractTypeId,
        'openid': window.localStorage.getItem('openId')
      }).then(res => {
        this.LoadingingStatus(false)
        if (res.success && res.content) {
          for (let i = 0; i < res.content.length; i++) {
            res.content[i].imageUri = 'http://www.xclerk.com/upload/' + res.content[i].imageUri
            that.mobileList.push(res.content[i])
          }
        }
      })
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
          appId: self.$appId,
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
    call (shopMobile) {
      window.location.href = 'tel://' + shopMobile
    }
  }
}
</script>

<style lang="less" scoped>
.all{
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    background: #F3F5F9;
    overflow-y: scroll;
    .mobileList{
        width: 100%;
        li {
            background: #FFFFFF;
            margin-bottom: .1rem;
        }
        .header{
            font-size: .15rem;
            color: #222222;
            letter-spacing: 0;
            text-align: left;
            padding: .1rem .1rem 0.05rem .2rem;
        }
        ul li img{
            margin-left: .2rem;
            width: 3.35rem;
            height: 1.85rem;
        }
        .title{
            display: flex;
            padding: 0  0.1rem .1rem .2rem;
            margin-top: -.1rem;
            .shopname{
                flex: 1;
                font-size: .14rem;
                color: #222222;
            }
            .phone{
                font-size: .14rem;
                color: #222222;
                i{
                    display: inline-block;
                    width: .17rem;
                    height: .14rem;
                    margin: auto auto;
                    vertical-align: middle;
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                    &.iph{
                        background-image: url('../images/icon/iphone.png');
                    }
                }
                span{
                    padding-left: .05rem;
                    vertical-align: middle;
                }
            }
        }
        .address{
            font-size: .14rem;
            color: #999999;
            padding: 0 .1rem .1rem .2rem;
            position: relative;
            i{
                display: inline-block;
                width: .15rem;
                height: .15rem;
                margin: auto auto;
                background-size: 100% 100%;
                background-repeat: no-repeat;
                &.addr{
                    background-image: url('../images/icon/addr.png');
                }
            }
        }
        .time{
            font-size: .14rem;
            color: #999999;
            padding: .05rem .1rem .1rem .2rem;
            position: relative;
            i{
                display: inline-block;
                width: .15rem;
                height: .15rem;
                margin: auto auto;
                background-size: 100% 100%;
                background-repeat: no-repeat;
                vertical-align: middle;
                &.timePic{
                    background-image: url('../images/icon/time.png');
                }
            }
            .timeValue{
              padding-left: .1rem;
            }
        }
      }
    }
</style>
