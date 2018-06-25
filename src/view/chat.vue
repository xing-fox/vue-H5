<style lang="less" scoped>
.page {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #f3f5f9;
  z-index: 10;
  .chatBox {
    height: 90vh;
    padding: 0.2rem 0.1rem 0;
    box-sizing: border-box;
    overflow-y: scroll;
    z-index: 1;
    -webkit-overflow-scrolling: touch;
    .chatOther {
      max-width: 85%;
      margin: 0 0 0.2rem 0;
      display: flex;
      img {
        width: 0.4rem;
        height: 0.4rem;
      }
      .inputText {
        color: #303030;
        font-size: 0.14rem;
        margin: 0 0 0 0.15rem;
        padding: 0.1rem 0.05rem 0.1rem 0.1rem;
        border-radius: 3px;
        background: #fff;
        position: relative;
        &:before {
          content: "";
          width: 0;
          height: 0;
          border-top: 6px solid transparent;
          border-right: 6px solid #fff;
          border-bottom: 6px solid transparent;
          position: absolute;
          top: 8px;
          left: -6px;
        }
      }
    }
    .chatyourself {
      font-size: 0;
      margin: 0 0 0.2rem 15%;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      .inputText {
        color: #303030;
        font-size: 0.14rem;
        margin: 0 0.15rem 0 0;
        padding: 0.1rem 0.05rem 0.1rem 0.1rem;
        border-radius: 3px;
        background: #fff;
        position: relative;
        &:before {
          content: "";
          width: 0;
          height: 0;
          border-top: 6px solid transparent;
          border-left: 6px solid #fff;
          border-bottom: 6px solid transparent;
          position: absolute;
          top: 8px;
          right: -6px;
        }
      }
      img {
        display: inline-block;
        width: 0.4rem;
        min-width: 0.4rem;
        height: 0.4rem;
      }
    }
  }
  .chatInput {
    height: 10vh;
    background: #f3f5f9;
    box-sizing: border-box;
    position: relative;
    input {
      border: none;
      -webkit-appearance: none;
      width: 3rem;
      height: 0.34rem;
      line-height: 0.34rem;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0.1rem;
      margin: auto 0;
      padding: 0 0 0 0.1rem;
      border-radius: 3px;
      border: 1px solid #eee;
      box-sizing: border-box;
    }
    .submit {
      color: #303030;
      font-size: 0.12rem;
      background: #ffda44;
      width: 0.4rem;
      height: 0.34rem;
      line-height: 0.34rem;
      text-align: center;
      border-radius: 3px;
      border: 1px solid #f1f1f1;
      box-sizing: border-box;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0.1rem;
      margin: auto 0;
    }
  }
}
</style>

<template>
  <div class="page">
    <div v-wechat-title="$route.meta.title"></div>
    <div class="chatBox" ref="chatBox">
      <div v-for="(item, index) in Message" :key="index">
        <div class="chatyourself" v-if="item.from == customerdata.im_uuid">
          <span class="inputText">{{ item.msg }}</span>
          <img src="../images/icon/header.png">
        </div>
        <div class="chatOther" v-if="item.from == assistantdata.im_uuid">
          <img :src="assistant_img">
          <span class="inputText">{{ item.msg }}</span>
        </div>
      </div>
    </div>
    <div class="chatInput bor-t">
      <input type="text" v-model="inputText" @focus="inputFocusFunc" @blur="inputBlurFunc" placeholder="请输入">
      <div class="submit" @click="submitFunc">确认</div>
    </div>
  </div>
</template>

<script>
import SDK from 'NIM'
export default {
  data () {
    return {
      nim: '',
      inputText: '',
      customerdata: '',
      assistantdata: '',
      Message: [],
      assistant_id: this.$route.query.assistantId,
      assistant_img: this.$route.query.assistantImg
    }
  },
  created () {
    let self = this
    self.$http
      .gettalkinfo({
        data: JSON.stringify({
          assistant_id: self.assistant_id
        }),
        openid: window.localStorage.getItem('openId')
      })
      .then(res => {
        self.customerdata = res.content.customer
        self.assistantdata = res.content.assistant
        // SDK.getLocalSessions({
        //   lastSessionId: lastSessionId,
        //   limit: 100,
        //   done: function(error, obj) {
        //     console.log(error);
        //     console.log(obj);
        //     console.log('获取本地会话列表' + (!error ? '成功' : '失败'));
        //     if (!error) {
        //       onSessions(obj.sessions);
        //     }
        //   }
        // });
        // SDK.insertLocalSession({
        //   scene: 'p2p',
        //   to: res.content.assistant.im_uuid,
        //   done: function (error, obj) {
        //     console.log('插入本地会话记录' + (!error?'成功':'失败'), error, obj)
        //     if (!error) {
        //       onSessions(obj.session)
        //     }
        //   }
        // })
        this.init(res.content.customer)
      })
  },
  methods: {
    init (data) {
      let self = this
      this.nim = SDK.getInstance({
        appKey: '89f2c618cbe57fbb3b050b2515ce9c97',
        account: data.im_uuid,
        token: data.im_pass,
        isPushable: true,
        isRoamingable: true,
        isSyncable: true,
        db: true,
        onconnect: self.onConnect,
        onwillreconnect: self.onWillReconnect,
        ondisconnect: self.onDisconnect,
        onerror: self.onError,
        onmsg: self.onMsg,
        onroamingmsgs: self.onRoamingMsgs,
        onofflinemsgs: self.onOfflineMsgs,
        onsyncRoamingMsgs: self.onSyncRoamingMsgs
      })
    },
    isAndroid () {
      let u = window.navigator.userAgent
      return u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
    },
    isIphoneX () {
      return (
        /iphone/gi.test(navigator.userAgent) &&
        (screen.height === 812 && screen.width === 375)
      )
    },
    inputFocusFunc (e) {
      if (!this.isAndroid() && this.isIphoneX()) {
        this.$refs.chatBox.style.height = `75vh`
      }
    },
    inputBlurFunc (e) {
      if (!this.isAndroid() && this.isIphoneX()) {
        this.$refs.chatBox.style.height = `90vh`
      }
    },
    onConnect () {
      console.log('连接成功')
    },
    onWillReconnect () {
      console.log('即将重连')
    },
    onDisconnect () {
      console.log('丢失连接')
      console.log('error')
    },
    onError (error) {
      console.log(error)
    },
    onMsg (msg) {
      console.log(msg)
      this.Message.push({
        msg: msg.text,
        from: this.assistantdata.im_uuid
      })
      console.log('收到消息')
    },
    pushMsg () {
      console.log('123')
    },
    // onRoamingMsgs (obj) {
    //   console.log(obj)
    //   obj.msgs.map((item, index) => {
    //     this.Message.push({
    //       msg: item.text,
    //       from: item.to
    //     })
    //   })
    //   console.log('收到漫游消息')
    // },
    onOfflineMsgs (obj) {
      console.log(obj)
      this.Message.push({
        msg: obj.text,
        from: this.assistantdata.im_uuid
      })
      console.log('收到离线消息')
    },
    onSyncRoamingMsgs () {},
    submitFunc () {
      if (this.inputText) {
        let msg = {
          scene: 'p2p',
          from: this.customerdata.im_uuid,
          to: this.assistantdata.im_uuid,
          flow: 'out',
          text: this.inputText
        }
        this.Message.push({
          msg: this.inputText,
          from: this.customerdata.im_uuid
        })
        this.inputText = ''
        this.nim.sendText(msg)
      } else {
        return false
      }
    }
  }
}
</script>
