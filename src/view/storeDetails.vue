<template>
    <div class="page">
        <div v-wechat-title="$route.meta.title"></div>
        <div class="header">
            <div class="swiper" ref="swipeid">
                <div class="swiper-wrapper" >
                    <div class="swiper-slide" v-for="(item, index) in shopPicList" :key="index">
                    <img :src="item.picture_url" @click="shopImgPre(index)">
                    </div>
                </div>
                <div class="swiperIndex boxOrent" v-if='swiperTotal'>
                    <span>{{ swiperIndex }}</span> / <span>{{ swiperTotal }}</span>
                </div>
            </div>
            <div class="storeCentra">
                <span class="storeName" v-if="shopinfo.shop_name ">{{ shopinfo.shop_name }}</span>
                <div class="storeConcern" :class="{collection:shopinfo.shop_collection_flag == '-1'}" @click="collection(shopinfo.shop_collection_flag)">
                    <span class="concern">{{ isCollection }}</span>
                </div>
            </div>
            <div class="grade bor-b">
                <div class="icon">
                    <i class="icon_all"></i><i class="icon_half"></i><i class="icon_no"></i>
                    <span>{{ shopinfo.shop_grade }}</span>
                </div>
                <span>已有{{ shopinfo.shop_collection_total || 0 }}人关注</span>
            </div>
            <div class="storeBottom">
                <div class="address">
                    <i class= "addrImg"></i>
                    <span class="addr" v-if="shopinfo.shop_address">{{ shopinfo.shop_address }}</span>
                </div>
                <div class="bor-l" style="padding-right: .2rem;" v-if="shopinfo.shop_mobile"></div>
                <i class="phoneImg" v-if="shopinfo.shop_mobile" @click="call(shopinfo.shop_mobile)"></i>
            </div>
        </div>
        <div class="new">
            <div class="newtit">
                <div class="title">
                    <i class="newImg"></i>
                    <span class="zuixin">最新动态</span>
                </div>
                <span class="more">更多</span><i class="right"></i>
            </div>
            <div class="newList">
                <ul>
                    <li v-for="(item, index) in shopNoteList" :key="index">
                        <div class="question" v-if="item.note_name">{{ item.note_name }}</div>
                        <p class="answer" v-if="item.note_desc">{{ item.note_desc }}</p>
                        <div class="imglist">
                            <ul>
                                <li v-for="(items, index) in item.notePictureList" :key="index">
                                    <img v-if="item.notePictureList.length === 1" class="imgInfo_1" :src="items.picture_url" @click="notePicPre(index, item.notePictureList)"/>
                                    <img v-if="item.notePictureList.length === 2" class="imgInfo_2" :src="item.picture_url" @click="notePicPre(index, item.notePictureList)"/>
                                    <img v-if="item.notePictureList.length === 3" class="imgInfo_3" :src="item.picture_url" @click="notePicPre(index, item.notePictureList)"/>
                                </li>
                            </ul>
                        </div>
                        <div class="bottom">
                            <img class="person" :src="item.customer_picture">
                            <div class="info">
                                <div class="name" v-if="item.customer_name">{{ item.customer_name }}</div>
                                <div class="time" v-if="item.created_at">{{ item.created_at }}-{{ item.distance}}km</div>
                            </div>
                             <div class="talkinfo">
                                <i class="talkImg"></i> {{ item.note_comment_total || 0}}
                            </div>
                            <div class="talkinfo">
                                <i class="zanImg"></i> {{ item.note_like_total || 0}}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="star">
                <div class="starTit"><i class="starImg"></i> 服务明星</div>
                <div class="starList">
                    <ul>
                        <li v-for="(item, index) in assistantList" :key="index">
                            <div class="starPerson">
                                <img :src="item.customer_picture" class="starPic">
                                <div class="starinfo">
                                    <div class="starname" v-if=" item.customer_name">{{ item.customer_name }}</div>
                                    <div class="infolist">
                                        <span>粉丝 {{ item.fans_total || 0}}</span>
                                        <span>笔记 {{ item.note_collection_total || 0}}</span>
                                        <span>获赞 {{ item.note_like_total || 0}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="liaoliao">
                                <span>+ 聊聊</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="hot">
                <div class="hotTit"><i class="hotImg"></i> 最热商品</div>
                <div class="hostList">
                    <ul>
                        <li class="hostright" @click="goodsOrderBy('1')">最新</li>
                        <li class="hostright" @click="goodsOrderBy('2')">最热</li>
                        <li class="hostright" @click="goodsOrderBy(priceOrder)">价格<i class="priceImg"></i></li>
                        <li class="hostright" @click="goodsOrderBy(xiaoliangOrder)">销量</li>
                        <li @click="selectShop()">筛选<i class="shaixuanImg"></i></li>
                    </ul>
                </div>
            </div>
            <div class="product">
                <div class="productList"  @scroll.stop.prevent="scrollFunc" ref="shopBox">
                    <ul>
                        <li v-for="(item, index) in goodsList" :key="index">
                            <img :src="item.picture_url" class="productImg">
                            <div class="desc">
                                <div class="descImg">自营</div>
                                <span>{{ item.product_name }} </span>
                            </div>
                            <div class="price">¥{{ item.product_price }}</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <shopSelect v-if="shopSelectFlag" @changeSpec="specFunc" @changeState="stateFunc"></shopSelect>
    </div>
</template>
<script>
import wx from 'wx'
import { mapActions } from 'vuex'
import Swiper from 'Swiper'
import { Base64 } from 'js-base64'
import shopSelect from '@/components/shopSelect'
export default {
  data () {
    return {
      // 店铺信息
      shopinfo: '',
      // 店铺图片
      shopPicList: [],
      swiperTotal: '',
      swiperIndex: 1,
      Dom: '',
      // 店铺id
      shopId: '51',
      openId: '',
      shopNoteList: [], // 最新动态
      assistantList: [], // 店员 服务明星
      goodsList: [], // 最热商品
      pagNo: 1,
      pagNum: 8,
      dataFlag: true,
      isCollection: '+ 关注',
      priceOrder: '3', // 商品价格排序
      xiaoliangOrder: '5', // 商品销量排序
      shopSelectFlag: false // 商品筛选侧滑
    }
  },
  components: {
    Swiper,
    shopSelect
  },
  created () {
    this.openId = window.localStorage.getItem('openId')
    this.openId = 'o4FLT1ccYykuDJaewHsGbSKxsZ24'
    this.shopInfo()
    this.shopNote()
    this.showAssistants()
    this.showgoods()
  },
  methods: {
    ...mapActions(['LoadingingStatus']),
    // 店铺详情
    shopInfo () {
      this.LoadingingStatus(true)
      this.$http.shopDetails({
        data: JSON.stringify({
          'shop_id': this.shopId
        }),
        openid: this.openId
      }).then(res => {
        this.LoadingingStatus(false)
        if (res.success && res.content) {
          this.shopinfo = res.content
          this.shopPicList = res.content.assistantInfosMap.shoppicture
          this.swiperTotal = res.content.assistantInfosMap.shoppicture.length
          if (res.content.shop_collection_flag === '-1') {
            this.isCollection = '已关注'
          }
        }
      }).then(() => {
        this.Dom = new Swiper(this.$refs.swipeid, {
          direction: 'horizontal',
          autoplay: true,
          loop: false,
          observer: true,
          observeParents: true,
          on: {
            transitionEnd: () => {
              if (this.swiperTotal >= this.swiperIndex) {
                this.swiperIndex = this.Dom.activeIndex + 1
              }
            }
          }
        })
      })
    },
    // 打电话
    call (shopMobile) {
      window.location.href = 'tel://' + shopMobile
    },
    /** 取消关注/关注 */
    collection (flag) {
      var ctype = ''
      flag === '1' ? ctype = '1' : ctype = '-1'
      this.$http.collectionShop({
        data: JSON.stringify({
          'shop_id': this.shopId,
          'type': ctype
        }),
        openid: this.openId
      }).then(res => {
        if (res.success && res.code === 'E00000') {
          if (flag === '1') {
            this.$toast('关注成功', {
              icon: 'none',
              duration: 2000,
              mask: true
            })
            this.isCollection = '已关注'
          } else {
            this.$toast('取消关注成功', {
              icon: 'none',
              duration: 2000,
              mask: true
            })
            this.isCollection = '+ 关注'
          }
          this.shopInfo()
        }
      })
    },
    // 最新动态
    shopNote () {
      this.$http.shopNotes({
        data: JSON.stringify({
          'shop_id': this.shopId,
          'pag_no': 1,
          'pag_num': 8
        }),
        openid: this.openId
      }).then(res => {
        if (res.success && res.content) {
          for (var i = 0; i < 3; i++) {
            res.content.noteinfo[i].note_name = Base64.decode(res.content.noteinfo[i].note_name)
            res.content.noteinfo[i].note_desc = Base64.decode(res.content.noteinfo[i].note_desc)
            res.content.noteinfo[i].distance = (parseFloat(res.content.noteinfo[i].distance) / 1000).toFixed(2)
            if (res.content.noteinfo[i].notePictureList.length > 3) {
              res.content.noteinfo[i].notePictureList = res.content.noteinfo[i].notePictureList.slice(0, 3)
            }
          }
          this.shopNoteList = res.content.noteinfo.slice(0, 3)
        }
      })
    },
    // 店员 服务明星
    showAssistants () {
      this.$http.getAssistants({
        data: JSON.stringify({
          'shop_id': this.shopId
        }),
        openid: this.openId
      }).then(res => {
        if (res.success && res.content) {
          this.assistantList = res.content.assistantinfo
        }
      })
    },
    // 最热商品
    showgoods () {
      this.LoadingingStatus(true)
      this.$http.getGoods({
        data: JSON.stringify({
          'shop_id': this.shopId
        //   'pag_no': this.pagNo,
        //   'pag_num': this.pagNum
        }),
        openid: this.openId
      }).then(res => {
        // this.dataFlag = true
        this.LoadingingStatus(false)
        if (res.success && res.content) {
        //   if (res.content.data.length < 8) {
        //     this.dataFlag = false
        //   }
          this.goodsList = res.content.data
        }
      })
    },
    scrollFunc () {
      /**
       * 滚动加载Func
       */
      if (this.$refs.shopBox.scrollTop + document.body.clientHeight + 50 > this.$refs.shopBox.scrollHeight && this.dataFlag) {
        this.dataFlag = false
        this.pagNo++
        this.showgoods()
      }
    },
    // 预览图片
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
          jsApiList: ['previewImage']
        })
        wx.ready(function () {})
      })
    },
    // 店铺图片查看
    shopImgPre (index) {
      wx.previewImage({
        current: this.shopPicList[index],
        urls: this.shopPicList
      })
    },
    // 最新动态 笔记图片预览
    notePicPre (index, notepicList) {
      wx.previewImage({
        current: notepicList[index],
        urls: notepicList
      })
    },
    // 商品排序
    goodsOrderBy (choose) {
      var order = ''
      order = choose
      if (choose === '3') {
        order = '4'
        this.priceOrder = '4'
      } else if (choose === '4') {
        order = '3'
        this.priceOrder = '3'
      } else if (choose === '5') {
        order = '6'
        this.xiaoliangOrder = '6'
      } else if (choose === '6') {
        order = '5'
        this.xiaoliangOrder = '5'
      }
      this.LoadingingStatus(true)
      this.$http.shopSelectList({
        data: JSON.stringify({
          'shop_id': this.shopId,
          'search_type': order
        }),
        openid: this.openId
      }).then(res => {
        this.LoadingingStatus(false)
        if (res.success && res.content) {
          this.goodsList = res.content
        } else {
          this.$toast('暂无商品！')
          return false
        }
      })
    },
    // 商品筛选按钮
    selectShop () {
      this.shopSelectFlag = true
    },
    specFunc (e) {
      this.goodsList = e.shopList
    },
    stateFunc () {
      this.shopSelectFlag = false
    }
  }
}
</script>

<style lang="less" scoped>
.page{
    width: 100%;
    height: 100%;
    .header{
      background:  #FFFFFF;
      width: 100%;
      .swiper{
            width: 100%;
            height: 1.75rem;
            background: #000;
            overflow: hidden;
            position: relative;
            .swiper-slide{
                font-size: 0;
                width: 100%;
                max-height: 3.75rem;
                position: relative;
            }
            .swiper-slide img{
                width: 100%;
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                margin: auto auto;
            }
            .swiper-slide video{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 3.75rem;
                z-index: 1;
            }
            .swiper-slide .vedioImg{
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,.5);
                position: absolute;
                top: 0;
                left: 0;
                img{
                    width: 1rem;
                    height: 1rem;
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    margin: auto auto;
                }
            }
            .swiperIndex{
                color: #fff;
                font-size: .14rem;
                width: .54rem;
                height: .26rem;
                text-align: center;
                display: -webkit-box;
                -webkit-box-pack: center;
                -webkit-box-align: center;
                text-align: center;
                background: #000;
                position: absolute;
                right: .2rem;
                bottom: .15rem;
                border-radius: .6rem;
                z-index: 10;
            }
      }
      .storeImg{
          width: 100%;
          height: 1.75rem;
          background: #000;
          img{
            width: 100%;
            height: 1.75rem;
          }
      }
      .storeCentra{
          display: flex;
          margin: .12rem .1rem;
          .storeName{
            flex: 1;
            font-size: .16rem;
            color: #222222;
            letter-spacing: .01rem;
          }
          .storeConcern{
            border: 1px solid #333333;
            border-radius: 5px;
            width: .8rem;
            height: .3rem;
            font-size: .13rem;
            text-align: center;
            .concern{
                color: #222222;
                line-height: .3rem;
                vertical-align: middle;
            }
          }
          .collection{
            border: 1px solid #FF2E2E;
            border-radius: 5px;
            width: .8rem;
            height: .3rem;
            font-size: .13rem;
            text-align: center;
            .concern{
                color: #FF2E2E;
                line-height: .3rem;
                vertical-align: middle;
            }
          }
      }
      .grade{
        display: flex;
        font-size: .13rem;
        margin: .1rem .1rem;
        .icon{
            flex: 1;
            vertical-align: middle;
            padding-bottom: .14rem;
        }
        .icon_no{
          display: inline-block;
          width: .15rem;
          height: .15rem;
          margin-right: .025rem;
          background-image: url('../images/icon/star_no.png');
          background-size: 100% 100%;
          background-repeat: no-repeat;
          vertical-align: middle;
        }
        .icon_half{
          display: inline-block;
          width: .15rem;
          height: .15rem;
          margin-right: .025rem;
          background-image: url('../images/icon/star_half.png');
          background-size: 100% 100%;
          background-repeat: no-repeat;
          vertical-align: middle;
        }
        .icon_all{
          display: inline-block;
          width: .15rem;
          height: .15rem;
          margin-right: .025rem;
          background-image: url('../images/icon/star_all.png');
          background-size: 100% 100%;
          background-repeat: no-repeat;
          vertical-align: middle;
        }
        span{
          color: #999999;
          letter-spacing: .01rem;
          vertical-align: middle;
        }
      }
      .storeBottom{
        font-size: .15rem;
        letter-spacing: .01rem;
        color: #999999;
        padding: 0 .1rem .1rem .1rem;
        position: relative;
        display: flex;
        .address{
            flex: 1;
            i{
                display: inline-block;
                width: .15rem;
                height: .15rem;
                margin: auto auto;
                background-size: 100% 100%;
                background-repeat: no-repeat;
                vertical-align: middle;
                &.addrImg{
                    background-image: url('../images/icon/addr.png');
                }
             }
        }
        .phoneImg{
            display: inline-block;
            width: .22rem;
            height: .22rem;
            background-image: url('../images/icon/iphone.png');
            background-size: 100% 100%;
            background-repeat: no-repeat;
            vertical-align: middle;
        }
      }
    }
    .new{
        width: 100%;
        margin-top: .1rem;
        background: #FFFFFF;
        height: .43rem;
        .newtit{
            display: flex;
            font-size: .15rem;
            padding: .1rem;
            .title{
                flex: 1;
                i{
                    display: inline-block;
                    width: .2rem;
                    height: .2rem;
                    margin: auto auto;
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                    vertical-align: middle;
                    &.newImg{
                            background-image: url('../images/icon/shang.png');
                        }
                }
            }
            .zuixin{
                vertical-align: middle;
            }
            .more{
                font-size: .15rem;
                color: #999999;
                vertical-align: middle;
            }
            i{
                display: inline-block;
                width: .15rem;
                height: .15rem;
                margin: auto auto;
                background-size: 100% 100%;
                background-repeat: no-repeat;
                vertical-align: middle;
                &.right{
                        background-image: url('../images/icon/right.png');
                    }
            }
        }
        .newList{
            ul li{
                margin-bottom: .1rem;
                background: #FFFFFF;
            }
            .question{
                font-size: .17rem;
                color: #222222;
                padding: .1rem .1rem 0 .1rem;
            }
            .answer{
                font-size: .14rem;
                padding: .05rem .1rem 0 .1rem;
                color: #999999;
            }
            .imglist{
                ul{
                    display: flex;
                    margin: .1rem .1rem 0 .1rem;
                    font-size: 0;
                }
                li{
                    padding-right: .05rem;
                }
                .imgInfo_1{
                    width: 3.55rem;
                    height: 2.3rem;
                }
                .imgInfo_2{
                    width: 1.74rem;
                    height: 1.16rem;
                }
                .imgInfo_3{
                    width: 1.13rem;
                    height: .75rem;
                }
            }
            .bottom{
                display: flex;
                padding: 0 .1rem .1rem .1rem;
                .person{
                    width: .44rem;
                    height: .44rem;
                }
                .info{
                    flex: 1;
                    padding-left: .1rem;
                    .name{
                        font-size: .15rem;
                        color: #222222;
                    }
                    .time{
                        font-size: .12rem;
                        color: #999999;
                        padding-top: .05rem;
                    }
                }
                .talkinfo{
                    margin: .1rem .1rem 0 .1rem;
                    font-size: .16rem;
                    color: #222222;
                    vertical-align: middle;
                    i{
                        display: inline-block;
                        width: .197rem;
                        height: .189rem;
                        margin-right: .1rem;
                        margin: auto auto;
                        vertical-align: middle;
                        background-size: 100% 100%;
                        background-repeat: no-repeat;
                        &.talkImg{
                            background-image: url('../images/icon/liaoliao.png');
                        }
                        &.zanImg{
                            background-image: url('../images/icon/admire_1.png');
                        }
                    }
                }
            }
        }
    }
    .star{
        background: #FFFFFF;
        margin-bottom: .1rem;
        .starTit{
            margin: .1rem;
            font-size: .15rem;
            color: #222222;
            padding-top: .1rem;
            i{
                display: inline-block;
                width: .2rem;
                height: .2rem;
                margin: auto auto;
                background-size: 100% 100%;
                background-repeat: no-repeat;
                vertical-align: middle;
                &.starImg{
                        background-image: url('../images/icon/shang.png');
                    }
            }
        }
        .starList{
            height: 1.5rem;
            ul{
                width: 100%;
                overflow-x: scroll;
                overflow-y: hidden;
                display: -webkit-box;
                -webkit-box-orient: horizontal;
                -webkit-box-direction: normal;
                flex-direction: row;
                margin: .1rem;
            }
            li{
                width: 2.7rem;
                height: 1.2rem;
                margin-left: .1rem;
                border: 1px solid #DFDFDF;
                box-shadow: 0 0 5px 1px rgba(223,223,223,0.30);
                border-radius: .05rem;
                .starPerson{
                    display: flex;
                    margin: .1rem .1rem 0 .1rem;
                    .starPic{
                        width: .55rem;
                        height: .55rem;
                        border-radius: .55rem;
                    }
                    .starname{
                        font-size: .16rem;
                        color: #222222;
                        margin-left: .1rem;
                    }
                    .infolist{
                        font-size: 0;
                        margin: .1rem;
                    }
                    span{
                        margin-right: .2rem;
                        font-size: .12rem;
                        color: #666666;
                    }
                }
                .liaoliao{
                    background: #FFFFFF;
                    border: 1px solid #333333;
                    border-radius: 5px;
                    width: .88rem;
                    height: .3rem;
                    font-size: 0;
                    text-align: center;
                    margin-left: .78rem;
                    span{
                        font-size: .13rem;
                        color: #222222;
                        line-height: .3rem;
                    }
                }
            }
        }
    }
    .hot{
        padding: .1rem;
        background: #FFFFFF;
        .hotTit{
            font-size: .15rem;
            color: #222222;
            vertical-align: middle;
            i{
                display: inline-block;
                width: .2rem;
                height: .2rem;
                margin: auto auto;
                background-size: 100% 100%;
                background-repeat: no-repeat;
                vertical-align: middle;
                &.hotImg{
                        background-image: url('../images/icon/shang.png');
                }
            }
        }
        .hostList{
            ul{
            display: flex;
            padding: .1rem 0 0 .2rem;
            }
            li{
                font-size: .14rem;
                color: #222222;
                i{
                    display: inline-block;
                    width: .11rem;
                    height: .14rem;
                    margin: auto auto;
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                    vertical-align: middle;
                    margin-left: .02rem;
                    &.shaixuanImg{
                        background-image: url('../images/icon/shaixuan.png');
                    }
                }
            }
            .hostright{
                 padding-right: .4rem;
                 vertical-align: middle;
                 i{
                    display: inline-block;
                    width: .15rem;
                    height: .19rem;
                    margin: auto auto;
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                    vertical-align: middle;
                    margin-left: .02rem;
                    &.priceImg{
                        background-image: url('../images/icon/priceJT.png');
                    }
                }
            }
        }
    }
    .productList{
        margin-top: .1rem;
        ul{
            display: flex;
            flex-wrap: wrap;
            margin-left: .1rem;
        }
        li{
            background: #FFFFFF;
            width: 1.72rem;
            margin: 0 .1rem .1rem 0;
            font-size: 0;
            .productImg{
                width: 1.41rem;
                height: 1.61rem;
                margin: .1rem .15rem;
                border: none;
            }
            .desc{
               font-size: 0;
               margin: .1rem .1rem .05rem .1rem;
               display: flex;
               // flex-wrap: wrap;
              .descImg{
                  border-radius: 3px;
                  width: .25rem;
                  height: .14rem;
                  font-size: 9px;
                  color: #FF6600;
                  border: 1px solid #FF6600;
                  text-align: center;
                  vertical-align: middle;
                }
                span{
                    font-size: .15rem;
                    color: #222222;
                    padding-left: .05rem;
                    vertical-align: middle;
                }
            }
            .price{
                font-size: .17rem;
                color: #FF2E2E;
                margin: 0 0 .1rem .1rem;
            }
        }
    }
}
</style>
