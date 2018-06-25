<template>
  <div class="page">
    <div v-wechat-title="$route.meta.title"></div>
    <div class="edit">
      <div class="name bor-b">
        <label for="name">收货人</label>
        <input type="text" v-model="dataName">
      </div>
      <div class="telephone bor-b">
        <label for="telephone">联系电话</label>
        <input type="tel" v-model="dataPhone">
      </div>
      <!-- <picker mode="region" :value="region" @change="CityChange"> -->
      <div class="area bor-b">
          <label for="name">所在区域</label>
          <span class="areaAddr">{{ region }}</span>
          <span class="areaChoise">请选择</span>
      </div>
      <!-- </picker> -->
      <div class="ditailAddr">
        <textarea placeholder="请填写详细地址，不少于5个字" v-model="dataArea"></textarea>
      </div>
      <div class="submit" @click="submitFunc">
        <span>保存</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      openId: '',
      listIndex: this.$route.query.index,
      region: '浙江省嘉兴市嘉善区',
      dataList: Object,
      dataName: '',
      dataPhone: '',
      dataArea: ''
    }
  },
  components: {},
  methods: {
    init () {
      this.$http.selectAddress({
        openid: this.openId
      }).then(res => {
        this.dataList = res.data.content[this.listIndex]
        this.dataName = this.dataList.receiver_name
        this.dataPhone = this.dataList.receiver_phone
        this.region = this.dataList.receiver_area
        this.dataArea = this.dataList.detail_address
      })
    },
    // CityChange (e) {
    //   this.region = e.mp.detail.value
    // },
    submitFunc () {
      this.region = this.region.constructor === Array ? this.region.join(',').replace(/,/g, '') : this.region
      if (!this.dataName) {
        // return wx.showToast({
        //   title: '请输入姓名',
        //   icon: 'none',
        //   duration: 2000,
        //   mask: true
        // })
      }
      if (!(/^1[3|4|5|7|8|9][0-9]\d{4,8}$/.test(this.dataPhone))) {
        // return wx.showToast({
        //   title: '手机号输入有误',
        //   icon: 'none',
        //   duration: 2000,
        //   mask: true
        // })
      }
      if (!this.region) {
        // return wx.showToast({
        //   title: '请选择所在区域',
        //   icon: 'none',
        //   duration: 2000,
        //   mask: true
        // })
      }
      if (!this.dataArea) {
        // return wx.showToast({
        //   title: '请填写详细地址',
        //   icon: 'none',
        //   duration: 2000,
        //   mask: true
        // })
      }
      if (this.listIndex) {
        this.$http.modifyAddress({
          data: JSON.stringify({
            address_id: this.dataList.address_id,
            receiver_name: this.dataName,
            receiver_phone: this.dataPhone,
            receiver_area: this.region,
            detail_address: this.dataArea
          }),
          openid: this.openId
        }).then(res => {
        //   wx.showToast({
        //     title: res.data.content,
        //     icon: 'none',
        //     duration: 1000
        //   })
          setTimeout(() => {
            // wx.navigateBack({
            //   delta: 1
            // })
          }, 500)
        })
      } else {
        this.$http.addAddress({
          data: JSON.stringify({
            receiver_name: this.dataName,
            receiver_phone: this.dataPhone,
            receiver_area: this.region,
            detail_address: this.dataArea
          }),
          openid: this.openId
        }).then(res => {
          if (res.data.code === 'E00000') {
            // wx.showToast({
            //   title: res.data.msg,
            //   icon: 'none',
            //   duration: 1000
            // })
            setTimeout(() => {
            //   wx.navigateBack({
            //     delta: 2
            //   })
            }, 1000)
          } else {
            // wx.showToast({
            //   title: '该收货地址不在服务区，请填写浙江嘉兴地区的收货地址!',
            //   icon: 'none',
            //   duration: 2000
            // })
          }
        })
      }
    }
  }
//   onLoad (options) {
//     this.listIndex = options.index
//   },
//   onShow () {
//     let self = this
//     wx.getStorage({
//       key: "openId",
//       success: function(res) {
//         self.openId = res.data
//         if (self.listIndex) {
//           self.init()
//         } else {
//           self.dataName = ''
//           self.dataPhone = ''
//           self.region = ''
//           self.dataArea = ''
//         }
//       }
//     })
//   }
}
</script>

<style lang="less" scoped>
.page {
  width: 100%;
  height: 100%;
  position: relative;
  background: #f3f5f9;
  .edit {
    color: #333;
    font-size: .16rem;
    width: 100%;
    background: #fff;
    label {
      width: .9rem;
      vertical-align: middle;
    }
    input {
      flex: 1;
      height: .5rem;
      border: none;
      -webkit-appearance: none;
      color: #666;
      font-size: .14rem;
      margin: 0 .1rem 0 0;
    }
    .name {
      margin: 0 0 0 .15rem;
      height: .5rem;
      line-height: .5rem;
      background: #fff;
      display: flex;
    }
    .telephone {
      margin: 0 0 0 .15rem;
      height: .5rem;
      line-height: .5rem;
      background: #fff;
      display: flex;
    }
    .area {
      margin: 0 0 0 .15rem;
      height: .5rem;
      line-height: .5rem;
      background: #fff;
      display: flex;
      .areaAddr {
        color: #666;
        font-size: .14rem;
      }
      .areaChoise {
        flex: 1;
        color: #999;
        font-size: .13rem;
        margin: 0 .15rem 0 0;
        text-align: right;
      }
    }
    .ditailAddr {
      color: #999;
      width: 100%;
      padding: .15rem;
      box-sizing: border-box;
      textarea {
        width: 100%;
        height: 2rem;
        border: none;
        font-size: .14rem;
        -webkit-appearance: none;
      }
    }
  }
  .submit {
    color: #222;
    font-size: 0.16rem;
    width: 100%;
    height: .55rem;
    line-height: .55rem;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #ffda44;
    text-align: center;
  }
}
</style>
