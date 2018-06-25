<template>
  <div class="page">
    <div v-wechat-title="$route.meta.title"></div>
    <div class="pageIndex">
      <ul>
        <li v-for="(item, index) in addrList" :key="index">
          <div class="content">
            <div class="contName">{{ item.receiver_name }} ({{ item.receiver_phone }})</div>
            <div class="contAddr">
              {{ item.receiver_area }}{{ item.detail_address }}
            </div>
          </div>
          <div class="contIntro bor-t">
            <span class="default" @click="defaultFunc(index, item.address_id)">
              <i v-if="item.address_flag == '1'" class="icon_default"></i>
              <i v-else class="icon_undefault"></i>
              <span class="introName">设为默认</span>
            </span>
            <span class="delete" @click="deleteFunc(index, item.address_id)">
              <i class="icon_delete"></i><span class="introName">删除</span>
            </span>
            <span class="edit" @click="editFunc(index)">
              <i class="icon_edit"></i><span class="introName">编辑</span>
            </span>
          </div>
        </li>
      </ul>
      <div class="noData" v-if="noData">
        <NoData></NoData>
      </div>
      <div class="addManager" @click="addFunc">
        <span>新增收货地址</span>
      </div>
    </div>
  </div>
</template>

<script>
import NoData from '@/components/nodata'
export default {
  data () {
    return {
      openId: '',
      noData: '',
      addrList: []
    }
  },
  components: {
    NoData
  },
  methods: {
    init () {
      this.$http.myAddress({
        'openid': this.openId
      }).then(res => {
        if (res.content === null) {
          this.noData = true
        } else {
          this.addrList = res.content
        }
      })
    },
    defaultFunc (index, id) {
      let self = this
      if (self.addrList[index].address_flag === '1') {
        return this.$toast('当前已是默认地址', {
          durtaion: 200
        })
      }
      this.$http.defaultAddress({
        data: JSON.stringify({
          address_id: id
        }),
        'openid': self.openId
      }).then(res => {
        this.init()
        return this.$toast('默认地址设置成功', {
          durtaion: 200
        })
      })
    },
    deleteFunc (index, id) {
      let self = this
      this.$confirm('确定删除该收货地址吗?', {
        title: '小猿友情提示',
        yes: {
          text: '确定'
        },
        no: {
          text: '取消'
        }
      }).then(() => {
        self.$http.deleteAddress({
          data: JSON.stringify({
            address_id: id
          }),
          'openid': self.openId
        }).then(res => {
          self.init()
        })
      }).catch(() => {
        return false
      })
    },
    editFunc (index) {
      this.$router.push({
        path: '/wechat_pub/addrEdit?index=' + index
      })
    },
    addFunc () {
      this.$router.push({
        path: '/wechat_pub/addrEdit'
      })
    }
  },
  created () {
    this.openId = 'o4FLT1S5omU0ocpWy7PgNoNWYgGA'
    // this.openId = window.localStorage.getItem('openId')
    this.init()
  }
}
</script>

<style lang="less" scoped>
.page{
  width: 100%;
  height: 100%;
  position: relative;
  background: #f3f5f9;
  .pageIndex,ul{
    width: 100%;
    li{
      width: 100%;
      padding: .15rem 0 0 0;
      margin: 0 0 .1rem 0;
      box-sizing: border-box;
      background: #fff;
      .content{
        font-size: .14rem;
        margin: 0 0 .15rem 0;
        padding: 0 .15rem;
        .contName{
          color: #333;
          line-height: .2rem;
        }
        .contAddr{
          color: #777;
          line-height: .2rem;
          span{
            color: #ffda44;
          }
        }
      }
      .contIntro{
        color: #777;
        font-size: .13rem;
        height: .45rem;
        line-height: .45rem;
        padding: 0 .15rem;
        display: flex;
        i{
          display: inline-block;
          background-size: 100% 100%;
          background-repeat: no-repeat;
          margin: 0 .05rem 0 0;
          vertical-align: middle;
        }
        .introName{
          vertical-align: middle;
        }
        .icon_default{
          width: .23rem;
          height: .23rem;
          background-image: url('../images/icon/select.png');
        }
        .icon_undefault{
          width: .23rem;
          height: .23rem;
          background-image: url('../images/icon/unselect.png');
        }
        .icon_delete{
          width: .18rem;
          height: .18rem;
          background-image: url('../images/icon/del.png');
        }
        .icon_edit{
          width: .18rem;
          height: .18rem;
          background-image: url('../images/icon/edit.png');
        }
        .default{
          flex: 1;
        }
        .delete{
          margin: 0 .25rem 0 0;
        }
      }
    }
  }
  ul{
    padding: 0 0 .6rem 0;
  }
  .noData{
    font-size: 0;
    width: 100%;
    background: #fff;
    padding: .2rem 0 0 0;
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
