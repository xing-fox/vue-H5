<template>
    <div class="page">
        <div class="content" :class="{fadeInLeft: animalClassfadeIn,animated: animalClassfadeIn,animated: animalClassfadeOut,fadeInLeft: animalClassfadeOut}">
            <div class="price">
                <span>价格区间 (元)</span>
                <div class="priceDis">
                    <input v-model="start_price" type="text" placeholder="最低价"/><div class="center"></div>
                    <input type="text" v-model="end_price" placeholder="最高价"/>
                </div>
            </div>
            <div class="brand">
                <span>品牌</span>
                <ul>
                    <li v-for="(item, index) in shopBrandList" :key="index" @click="chooseBrand(item.brand_id)" >
                        <img :src="item.brand_picture" class="img"/>
                    </li>
                </ul>
            </div>
            <div class="supplier">
                <span>运营商</span>
                <ul>
                    <li v-for="(item, index) in supplierList" :key="index" :class="{ active:activeIndex == index}" @click="chooseSupplier(index, supplier_id)">
                        <span>{{ item.supplier_desc }}</span>
                    </li>
                </ul>
            </div>
            <div class="bottom">
                <span class="cancel" @click="cancel()">重置</span><span class="submit" @click="submitData()">确定</span>
            </div>
        </div>
        <div class="zzc" @click="pageFunc"></div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      animalClassfadeIn: true,
      animalClassfadeOut: false,
      shopBrandList: [], // 品牌列表
      activeIndex: -1, // 点击运营商样式控制
      clickBrandIds: [], // 点击选择的品牌
      supplierList: [], // 运营商列表
      supplier_id: '', // 运营商id
      start_price: '', // 低价格
      end_price: '', // 高价格
      brand_id: '',
      openId: ''
    }
  },
  created () {
    this.openId = window.localStorage.getItem('openId')
    this.openId = 'o4FLT1ccYykuDJaewHsGbSKxsZ24'
    this.brandInit()
    this.supplierInit()
  },
  methods: {
    // 初始化品牌
    brandInit () {
      this.$http.shopBrand({
      }).then(res => {
        if (res.success && res.content) {
          this.shopBrandList = res.content
        }
      })
    },
    // 初始化运营商
    supplierInit () {
      this.$http.supplierList({
      }).then(res => {
        if (res.success && res.content) {
          this.supplierList = res.content
        }
      })
    },
    // 点击手机品牌
    chooseBrand (brandId) {
      this.brand_id = this.brand_id + brandId + ','
      this.clickBrandIds.push(brandId)
    },
    // 选择运营商
    chooseSupplier (index, supplierId) {
      this.activeIndex = index
      this.supplier_id = supplierId
    },
    // 重置
    cancel () {
      this.activeIndex = -1
      this.supplier_id = ''
      this.clickBrandIds = []
    },
    // 提交
    submitData () {
      var price = /^(0|[1-9][0-9]{0,9})(\.[0-9]{1,2})?$/
      if (this.start_price && !price.test(this.start_price)) {
        this.$toast('价格格式不正确！')
        return false
      }
      if (this.end_price && !price.test(this.end_price)) {
        this.$toast('价格格式不正确！')
        return false
      }
      this.$http.chooseShopList({
        data: JSON.stringify({
          'start_price': this.start_price,
          'end_price': this.end_price,
          'supplier_id': this.supplier_id,
          'brand_id': this.brand_id
        }),
        openid: this.openId
      }).then(res => {
        if (res.success && res.content) {
          this.$emit('changeSpec', {
            shopList: res.content
          })
        } else {
          this.$toast('暂无商品！')
        }
        setTimeout(() => {
          this.$emit('changeState')
        }, 300)
      })
    },
    pageFunc (e) {
      this.animalClassfadeIn = false
      setTimeout(() => {
        this.animalClassfadeOut = true
      }, 0)
      setTimeout(() => {
        this.$emit('changeState')
      }, 300)
    }
  }
}
</script>
<style lang="less" scoped>
.page{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background-color: rgba(0, 0, 0, .7);
    overflow: scroll;
    .content{
        width: 88%;
        height: 100%;
        position: absolute;
        bottom: 0;
        right: 0;
        z-index: 10;
        background: #ffffff;
        font-size: 0;
        .price{
            margin: .2rem .1rem 0 .2rem;
            span{
                font-size: .13rem;
                color: #999999;
                letter-spacing: .01rem;
            }
            .priceDis{
                display: flex;
                margin-top: .2rem;
                .center{
                    border-bottom: 1px solid #999999;
                    width: .2rem;
                }
                input{
                    border: 1px solid #DDDDDD;
                    border-radius: 3px;
                    width: 1.34rem;
                    height: .34rem;
                    text-align: center;
                    color: #999999;
                    margin-right: .3rem;
                }
            }
        }
        .brand{
            margin: .1rem 0 0 .2rem;
            span{
                font-size: .13rem;
                color: #999999;
                letter-spacing: .01rem;
            }
            ul{
                display: flex;
                flex-wrap: wrap;
                margin: .1rem .1rem 0 0;
                li{
                   margin: 0 .2rem .2rem 0;
                   width: .77rem;
                   height: .28rem;
                   text-align: center;
                   // border: 1px solid #DDDDDD;
                   // border-radius: 3px;
                   img{
                       width: auto;
                       height: .28rem;
                   }
                }
            }
            .active{
                border: 1px solid #89fcf6c2;
            }
        }
        .supplier{
            font-size: 0;
            margin: 0 0 0 .2rem;
            span{
                font-size: .13rem;
                color: #999999;
                letter-spacing: .01rem;
            }
            ul{
                display: flex;
                flex-wrap: wrap;
                margin: .1rem .1rem 0 0;
                li{
                   margin: 0 .2rem .2rem 0;
                   width: .77rem;
                   height: .32rem;
                   border: 1px solid #DDDDDD;
                   border-radius: 3px;
                   text-align: center;
                   span{
                        font-size: .13rem;
                        color: #222222;
                        letter-spacing: .01rem;
                        line-height: .32rem;
                   }
                   &.active {
                        background-color: #ffda44;
                    }
                }
            }
        }
        .bottom{
            display: flex;
            bottom: 0;
            position: fixed;
            text-align: center;
            .cancel{
                width: 1.66rem;
                height: .49rem;
                border-top: 1px solid #DDDDDD;
                font-size: 16px;
                color: #222222;
                letter-spacing: .01rem;
                line-height: .49rem;
            }
            .submit{
                width: 1.66rem;
                height: .49rem;
                letter-spacing: .01rem;
                line-height: .49rem;
                font-size: 16px;
                background: #FFDA44;
            }
        }
    }
    .zzc{
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 1;
      background-color: rgba(0,0,0, .5);
    }
}
</style>
