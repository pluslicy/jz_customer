<template>
  <div class="order_pane">
    <ul>
      <li class="order" v-for="o in data" :key="o.id">
        <van-row>
          <van-col :span="6">
            <img width="90%" src="../assets/images/home_21.png" alt="">
          </van-col>
          <van-col :span="18">
            <p class="title">下单时间：{{o.orderTime | datefmt}}</p>
            <p class="price">总额：￥{{o.total}}</p>
            <p class="status">进度：{{o.status}}</p>
            <div class="btns">
              <div v-if="o.status ==='待确认'">
                <van-button size="mini" plain type="primary" @click="confirmOrder(o.id)">确认完成</van-button>
              </div>
            </div>
          </van-col>
        </van-row>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props:["data"],
  created(){

  },
  methods:{
    confirmOrder(orderId){
      this.$emit("confirm",orderId)
    }
  }
}
</script>
<style scoped>

.order {
  padding: .5em;
  margin-bottom: 1em;
  border-bottom: 1px solid #ededed;
  /* box-shadow: 0 1px 5px rgba(0,0,0,0.3) */
  /* height: 8em; */
  overflow-y: hidden;
}
.order .title {
  line-height: 2em;
}
.order .price {
  color: #ff700d;
  line-height: 2em;
}
.order .status {
  line-height: 2em;
}
</style>