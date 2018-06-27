<template>
    <div class="page">
        <div v-wechat-title="$route.meta.title"></div>
        <div class="header">
            <div class="storeImg"><img src="../images/1.png"/></div>
            <div class="storeCentra">
                <span class="storeName">嘉兴迪信通</span>
                <div class="storeConcern">
                    <span class="concern">+ 关注</span>
                </div>
            </div>
            <div class="grade bor-b">
                <div class="icon">
                    <i class="icon_all"></i><i class="icon_half"></i><i class="icon_no"></i>
                    <span>3.5</span>
                </div>
                <span>已有30人关注</span>
            </div>
            <div class="storeBottom">
                <div class="address">
                    <i class= "addrImg"></i>
                    <span class="addr">安徽省合肥市蜀山区万达广场</span>
                </div>
                <div class="bor-l" style="padding-right: .2rem;"></div><i class="phoneImg"></i>
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
                    <li>
                        <div class="question">你知道用手机也可以拍出大片吗？</div>
                        <p class="answer">成熟的技术的过山车v长时间的噶技术的播出时间</p>
                        <img src="../images/2.png"/>
                        <div class="bottom">
                            <div class="left">
                                <img />
                                <div>
                                    <div></div>
                                    <div></div>
                                </div>
                            </div>
                            <div class="centre">
                                <i></i><span>3.5W</span>
                            </div>
                            <div class="right">
                                <i></i><span>4W</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
.page{
    width: 100%;
    height: 100%;
    .header{
      background:  #FFFFFF;
      width: 100%;
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
        clear: both;
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
                            background-image: url('../images/icon/right.png');
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
            img{
                width: 3.55rem;
                height: 2.3rem;
                padding: .1rem .1rem 0 .1rem;
            }
            .bottom{
                display: flex;
                .left{
                    flex: 1;
                    img{
                        width: .3rem;
                        height: .3rem;
                    }
                }
                .centre span{
                    font-size: .16rem;
                    color: #222222;
                }
                .right span{
                    font-size: .16rem;
                    color: #222222;
                }
            }
        }
    }
}
</style>
