import Vue from 'vue'
import Router from 'vue-router'
Vue.use(require('vue-wechat-title'))
/*
** @/view/index 逛逛页面
** @/view/details 逛逛页面详情
*/
const Index = resolve => require(['@/view/index'], resolve)
const Details = resolve => require(['@/view/details'], resolve)
const Praise = resolve => require(['@/view/praise'], resolve)
const Evalmore = resolve => require(['@/view/evalmore'], resolve)
const Coupon = resolve => require(['@/view/coupon'], resolve)
const Nearbystore = resolve => require(['@/view/nearbystore'], resolve)
const Personal = resolve => require(['@/view/personal'], resolve)
const Address = resolve => require(['@/view/address'], resolve)
const AddrManager = resolve => require(['@/view/addrManager'], resolve)
const AddrEdit = resolve => require(['@/view/addrEdit'], resolve)
const Chat = resolve => require(['@/view/chat'], resolve)
const PhoneBill = resolve => require(['@/view/phoneBill'], resolve)
const MobileService = resolve => require(['@/view/mobileService'], resolve)
const BillList = resolve => require(['@/view/billList'], resolve)
const MobileList = resolve => require(['@/view/mobileList'], resolve)

/*
** @/view/goodsIndex 商品详情
*/
const GoodsIndex = resolve => require(['@/view/goodsIndex'], resolve)

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/wechat_pub/stroll',
      name: 'Index',
      component: Index,
      meta: {
        title: '潮机头条'
      },
      children: [
        {
          path: 'details',
          component: Details,
          meta: {
            title: '笔记详情'
          },
          children: [
            {
              path: 'praise',
              component: Praise
            },
            {
              path: 'evalmore',
              component: Evalmore
            },
            {
              path: 'chat',
              name: 'Chat',
              component: Chat,
              meta: {
                title: '微聊'
              }
            }
          ]
        }
      ]
    },
    {
      path: '/wechat_pub/goodsIndex',
      name: 'goodsIndex',
      component: GoodsIndex,
      meta: {
        title: '商品详情'
      }
    },
    {
      path: '/wechat_pub/mobileService',
      name: 'MobileService',
      component: MobileService,
      meta: {
        title: '移动业务'
      },
      children: [
        {
          path: 'PhoneBill',
          name: 'phoneBill',
          component: PhoneBill,
          meta: {
            title: '手机充值'
          }
        },
        {
          path: 'billList',
          name: 'BillList',
          component: BillList,
          meta: {
            title: '话费账单查询'
          }
        },
        {
          path: 'mobileList',
          name: 'MobileList',
          component: MobileList,
          meta: {
            title: '移动套餐办理'
          }
        }
      ]
    },
    {
      path: '/wechat_pub/coupon',
      name: 'Coupon',
      component: Coupon,
      meta: {
        title: '我的优惠券'
      }
    },
    {
      path: '/wechat_pub/address',
      name: 'Address',
      component: Address,
      meta: {
        title: '我的收货地址'
      }
    },
    {
      path: '/wechat_pub/addrManager',
      name: 'AddrManager',
      component: AddrManager,
      meta: {
        title: '管理收货地址'
      }
    },
    {
      path: '/wechat_pub/addrEdit',
      name: 'AddrEdit',
      component: AddrEdit,
      meta: {
        title: '编辑收货地址'
      }
    },
    {
      path: '/wechat_pub/personal',
      name: 'Personal',
      component: Personal,
      meta: {
        title: '个人中心'
      }
    },
    {
      path: '/wechat_pub/bystore',
      name: 'Nearbystore',
      component: Nearbystore,
      meta: {
        title: '附近门店'
      },
      children: [
        {
          path: 'details',
          component: Details,
          meta: {
            title: '笔记详情'
          },
          children: [
            {
              path: 'praise',
              component: Praise
            },
            {
              path: 'evalmore',
              component: Evalmore
            }
          ]
        }
      ]
    }
  ]
})
