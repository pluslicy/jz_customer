<template>
  <div id="order">
    <van-nav-bar fixed :title="'我的订单'" />
    <div class="content">
      <van-tabs v-model="activeName">
        <van-tab title="全部订单" name="a">
          <briup-order-pane :data="orders" @confirm="confirmHandler"></briup-order-pane>
        </van-tab>
        <van-tab title="未付款" name="b">
          <briup-order-pane :data="ordersFilter('未付款')"></briup-order-pane>
        </van-tab>
        <van-tab title="未服务" name="c">
          <briup-order-pane :data="ordersFilter('未服务')"></briup-order-pane>
        </van-tab>
        <van-tab title="待确认" name="d">
          <briup-order-pane :data="ordersFilter('待确认')" @confirm="confirmHandler"></briup-order-pane>
        </van-tab>
        <van-tab title="已完成" name="e">
          <briup-order-pane :data="ordersFilter('已完成')"></briup-order-pane>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import {mapState,mapActions,mapGetters} from "vuex"
export default {
  data(){
    return {
      activeName:"a"
    }
  },
  created(){
    this.findCustomerOrders()
  },
  computed:{
    ...mapState("order",["orders"]),
    ...mapState("app",["user"]),
    ...mapGetters("order",["ordersFilter"])
  },
  methods:{
    ...mapActions("order",["findCustomerOrders","confirmOrder"]),
    confirmHandler(orderId){
      this.confirmOrder(orderId)
      .then(result=>{
        this.$toast(result.statusText)
      })
    }
  }
}
</script>
<style scoped>
#order .content {
  padding-top: 46px;
  padding-bottom: 60px;
}
</style>