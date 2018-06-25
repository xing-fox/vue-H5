<template>
  <ul class="note">
    <li v-for="(item, index) in list" :key="index">
      <router-link :to="{ path: 'stroll/details', query:{'note_id': item.note_id}}">
      <div class="userInfo">
        <img class="infoImg" :src="item.customer_picture">
        <div class="userClerk" v-if="item.official_status == 1"></div>
        <div class="infoNameMark">
          <div class="name">{{ item.customer_name }}</div>
          <div class="mark">
            <span v-if="item.note_type == 0">认证营业员</span>
            <span v-if="item.hot_status == 1">最热笔记</span>
          </div>
        </div>
      </div>
      <!-- <div class="more"></div> -->
      <div class="noteInfo">
        <div class="info_title">{{ item.note_name }}</div>
        <div class="info_content">{{ item.note_desc }}</div>
      </div>
      <div class="noteImgs">
        <img v-for="(list, ind) in item.notePictureList" :key="ind" :src="list.picture_url" alt="">
      </div>
      <div class="userAddr" v-if="item.shop_address">
        <i></i><span>{{ item.shop_address }}</span>
      </div>
      <div class="distance">
        <span>{{ item.created_at }}</span> · <span>{{ item.note_view_total }}浏览</span>
      </div>
      <div class="userOperater bor-t">
        <div class="admire">
          <span @click.stop.prevent="zanFunc(index)" v-if="item.note_like_flag == '1'"><i class="admire"></i><span>{{ item.note_like_total }}</span></span>
          <span @click.stop.prevent="zanFunc(index)" v-else><i class="admire_1"></i><span>{{ item.note_like_total }}</span></span>
        </div>
        <div class="edit">
          <!-- <i></i><span>23</span> -->
        </div>
        <div class="talk" v-if="item.note_type == 0">
          <router-link :to="{ path: 'stroll/chat', query:{'assistantId': item.assistant_id, 'assistantImg': item.customer_picture} }">
          <i></i>
          </router-link>
        </div>
      </div>
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    list: {
      type: [Object, Array],
      required: true
    }
  },
  data () {
    return {
    }
  },
  created () {},
  methods: {
    zanFunc (arg) {
      if (this.list[arg].note_like_flag === '1') {
        this.list[arg].note_like_flag = '-1'
        this.list[arg].note_like_total = parseInt(this.list[arg].note_like_total) + 1
      } else {
        this.list[arg].note_like_flag = '1'
        this.list[arg].note_like_total = parseInt(this.list[arg].note_like_total) - 1
      }
      this.$http.zanNewNote({
        data: JSON.stringify({
          parameter_id: this.list[arg].note_id,
          operate: 2
        }),
        openid: window.localStorage.getItem('openId')
      }).then(response => {
        console.log(response)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.note {
  width: 100%;
  li {
    width: 100%;
    background: #fff;
    margin: 0 0 .06rem 0;
    padding: .15rem .12rem 0 .12rem;
    box-sizing: border-box;
    position: relative;
    .userInfo {
      position: relative;
      display: flex;
      .infoImg {
        width: .4rem;
        height: .4rem;
        border-radius: .2rem;
        background: #eee;
      }
      .userClerk {
        width: .15rem;
        height: .15rem;
        position: absolute;
        left: .3rem;
        bottom: 0;
        background-image: url("../images/icon/clerk.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: center center;
      }
      .infoNameMark {
        font-size: 0;
        margin: 0 0 0 .12rem;
        .name {
          color: #222;
          font-size: .15rem;
          line-height: .21rem;
        }
        .mark {
          margin: .04rem 0 0 0;
          span {
            color: #333;
            font-size: .09rem;
            height: .13rem;
            line-height: .13rem;
            border-radius: .065rem;
            padding: 0 .05rem;
            margin: 0 .05rem 0 0;
            background: #ffda44;
            display: inline-block;
          }
        }
      }
    }
    .more {
      width: .25rem;
      height: .25rem;
      position: absolute;
      top: .25rem;
      right: 0;
      background-image: url("../images/icon/more_share.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    .noteInfo {
      width: 100%;
      font-size: 0;
      color: #222;
      margin: .12rem 0 0 0;
      .info_normal {
        margin: 0 0 0.02rem 0;
        box-sizing: border-box;
        display: -webkit-box;
        word-break: break-all;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      .info_title {
        font-size: .17rem;
        line-height: .24rem;
        box-sizing: border-box;
        display: -webkit-box;
        word-break: break-all;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      .info_content {
        font-size: .15rem;
        line-height: .2rem;
        box-sizing: border-box;
        display: -webkit-box;
        word-break: break-all;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }
    .noteImgs {
      width: 100%;
      margin: .12rem 0 0 0;
      display: flex;
      img {
        width: 1.12rem;
        height: 1.12rem;
        &:nth-child(1),
        &:nth-child(2) {
          margin: 0 .07rem 0 0;
        }
      }
    }
    .userAddr {
      color: #828282;
      font-size: 0;
      height: .26rem;
      line-height: .26rem;
      border-radius: 1px;
      margin: .06rem 0 0 0;
      i {
        display: inline-block;
        width: .26rem;
        height: .26rem;
        background-image: url("../images/icon/map.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: center center;
        vertical-align: middle;
      }
      span {
        display: inline-block;
        font-size: .12rem;
        padding: 0 .05rem;
        vertical-align: middle;
        background: #f3f3f4;
      }
    }
    .distance {
      color: #999;
      font-size: .12rem;
      margin: .13rem 0;
      span {
        vertical-align: middle;
      }
    }
    .userOperater {
      width: 100%;
      height: .46rem;
      line-height: .46rem;
      display: flex;
      .admire {
        width: 1rem;
        i {
          display: inline-block;
          width: .2rem;
          height: .2rem;
          background-size: 100% 100%;
          background-repeat: no-repeat;
          background-position: center center;
          vertical-align: middle;
          &.admire{
            background-image: url("../images/icon/admire.png");
          }
          &.admire_1{
            background-image: url("../images/icon/admire_1.png");
          }
        }
        span {
          color: #aaa;
          font-size: .16rem;
          margin: 0 0 0 .05rem;
          vertical-align: middle;
        }
      }
      .edit {
        flex: 1;
        i {
          display: inline-block;
          width: .2rem;
          height: .2rem;
          background-image: url("../images/icon/editnote.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
          vertical-align: middle;
        }
        span {
          color: #aaa;
          font-size: .16rem;
          margin: 0 0 0 .05rem;
          vertical-align: middle;
        }
      }
      .talk {
        flex: 1;
        text-align: right;
        a{
          display: inline-block;
          width: 100%;
          height: 100%;
          i {
            display: inline-block;
            width: .2rem;
            height: .2rem;
            background-image: url("../images/icon/liaoliao.png");
            background-size: 100% 100%;
            background-repeat: no-repeat;
            vertical-align: middle;
          }
        }
      }
    }
  }
}
</style>
