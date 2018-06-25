<template>
  <div>
    <div v-for="(item, index) in datalist" :key="index" class="boxList" @click="changeDetails(item.product_id)">
      <div class="boxLeft">
        <img :src="item.picture_url">
      </div>
      <div class="boxRight">
        <div class="boxname">
          {{ item.product_name }}
        </div>
        <div v-if="item.detail_address" class="boxSite">
          {{ item.detail_address }}
        </div>
        <div class="boxPrice">
          <span>¥</span>{{ item.product_price }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    datalist: {
      type: Array
    }
  },
  methods: {
    changeDetails (id) {}
  }
}
</script>

<style>
.boxList {
  display: inline-block;
  font-size: 0;
  width: 1.73rem;
  background: #fff;
  margin: 0 0 .1rem .1rem;
  border-radius: .05rem;
}
.boxLeft {
  width: 1.73rem;
  height: 1.73rem;
  box-sizing: border-box;
}
.boxLeft img {
  width: 80%;
  height: 80%;
  margin: 10% 10%;
}
.boxRight .boxname {
  width: 100%;
  color: #222;
  font-size: .15rem;
  letter-spacing: 0;
  line-height: 0.21rem;
  text-align: center;
  display: -webkit-box;
  word-break: break-all;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}
.boxRight .boxSite {
  color: #999;
  font-size: .13rem;
  letter-spacing: 0;
  line-height: .18rem;
}
.boxRight .boxPrice {
  font-size: .17rem;
  color: #ff2e2e;
  margin: .08rem 0 .13rem 0;
  line-height: .24rem;
  text-align: center;
}
</style>
