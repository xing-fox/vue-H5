<template>
    <div class="page">
     <div class="content">
         <div v-wechat-title="$route.meta.title"></div>
         <div class="header">门店店猿提供代充话费，充流量和查账单服务，如有需要，请联系店猿办理。</div>
         <ul>
             <li  v-for="(item, index) in mobileList" :key="index">
                 <div class="title">
                     <div class="shopname">{{ item.shopName }}</div>
                     <div class="phone" @click="call(item.shopMobile)">
                         <i class="iph"></i><span>电话</span>
                      </div>
                 </div>
                 <div class="address">
                     <i class="addr"></i>
                     <span>{{ item.shopAddress }}</span>
                 </div>
             </li>
         </ul>
     </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'MobileList',
  data () {
    return {
      openId: '', // openid
      mobileList: [],
      contractTypeId: 4
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
      this.$http.mobileContractlist({
        'contractTypeId': this.contractTypeId,
        'openid': window.localStorage.getItem('openId')
      }).then(res => {
        this.LoadingingStatus(false)
        if (res.success && res.content) {
          this.mobileList = res.content
        }
      })
    },
    call (shopMobile) {
      window.location.href = 'tel://' + shopMobile
    }
  }
}
</script>
<style lang="less" scoped>
.page{
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background: #F3F5F9;
    overflow: scroll;
    .content{
        background:#FFFFFF;
        width: 3.47rem;
        margin: .14rem .14rem;
        border-radius: 0.1rem;
        .header{
            font-size: .15rem;
            color: #222222;
            margin:0 .22rem;
            padding-top: .22rem;
        }
        ul{
            padding-bottom: .1rem;
        }
        li{
            width: 3.2rem;
            background: #F3F5F9;
            margin: .13rem;
            border-radius: 0.05rem;
        }
        .title{
            display: flex;
            padding: 0.1rem .1rem .05rem;
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
                a{
                    text-decoration: none;
                    color: #222222;
                }
            }
        }
        .address{
            font-size: .14rem;
            color: #999999;
            padding: 0 .1rem .1rem .1rem;
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
    }
}
</style>
