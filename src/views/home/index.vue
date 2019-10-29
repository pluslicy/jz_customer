<template>
  <div id="home">
    <div class="line1">
      <img width="100%" src="../../assets/images/home_02.png" alt="">
    </div>
    <!-- 栏目 -->
    <ul class="categories">
      <li v-for="(c, index)  in getCategories(6)" :key="c.id" @click="toCategoryListHandler(index)">
        <div><img :src="c.icon" alt=""></div>
        <div>{{c.name}}</div>
      </li>
    </ul>
    <!-- 推荐 -->
    <ul class="advs">
      <li v-for="p in getProducts(3)" :key="p.id"  @click="toCategoryListHandler(0)">
        <div><img :src="p.photo" alt=""></div>
        <div>{{p.name}}</div>
      </li>
    </ul>

  </div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'
export default {
  computed:{
    ...mapGetters("category",["getCategories"]),
    ...mapGetters("product",["getProducts"])
  },
  methods:{
    toCategoryListHandler(index){
      this.$router.push("/categoryList/"+index)
    }
  }
}
</script>
<style scoped>
#home {
  padding-bottom: 60px;
}
.categories {
  text-align: center;
  margin-bottom: .5em;
}
.categories::after {
  content: "";
  clear:both;
  display: block
}
.categories > li {
  width: 33.33333%;
  float: left;
  height: 100px;
}
.advs {
  box-sizing: border-box;
  border-top:  1px solid #ededed;
  border-bottom:  1px solid #ededed;
  display: flex;
}
.advs > li {
  box-sizing: border-box;
  height: auto;
  text-align: center;
  flex:1;
}
.advs > li img {
  width: 95%;
}
</style>