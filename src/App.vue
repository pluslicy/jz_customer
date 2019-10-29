
<template>
  <div id="app">
    <div class="content">
      <router-view/>
    </div>
    <van-tabbar v-model="active" route>
      <van-tabbar-item replace to="/" name="index" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/order" name="order" icon="search">订单</van-tabbar-item>
      <van-tabbar-item replace to="/my" name="my" icon="friends-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>  
</template>
<script>
import {mapActions} from 'vuex'
export default {
  data(){
    return {
      active:"index"
    }
  },
  created(){
    // 自动登录
    this.login();
    // 查询所有栏目信息
    this.findOneLevelCategory();
    // 查询所有的商品信息
    this.findAllProducts();
  },
  methods:{
    ...mapActions("category",["findOneLevelCategory"]),
    ...mapActions("app",["login"]),
    ...mapActions("product",["findAllProducts"])

  },
}
</script>
<style scoped>

</style>