<template>
  <div id="categoryList">
    <briup-FullPageLayout title="商品分类" @back="backHandler">
      <div class="content">
        <!-- 左侧导航 -->
        <div class="left_nav">
          <van-sidebar v-model="activeKey">
            <van-sidebar-item :title="c.name" v-for="c in categories" :key="c.id" @click="findProductsHandler(c.id)"/>
          </van-sidebar>
        </div>
        <!-- / 左侧导航 -->
        <!-- 右侧内容 -->
        <div class="products_container">
          <div class="product" v-for="p in getProductsByCategoryId(categoryId)" :key="p.id">
            <van-row >
              <van-col span="6"><img width="100%" src="../../assets/images/home_19.png" alt=""></van-col>
              <van-col span="12">
                <p class="title">{{p.name}}</p>
                <p class="desc">360°清洗，全面烘干，熨烫整形，人工去球</p>
                <p class="price">
                  <span>￥</span> {{p.price}}
                </p>
              </van-col>
              <van-col class="step">
                <van-stepper @change="stepChangerHandler(p)" :min="0" v-model="p.number" input-width="24px" button-size="24px" />
              </van-col>
            </van-row>
          </div>
        </div>
        <!-- / 右侧内容 -->
        <!-- 底部购物车 -->
        <div class="shopcar">
           <van-row >
              <van-col span="5">
                总额 <span style="color:#ff700d;"><i>￥</i>{{shopcar_total}}</span>
              </van-col>
              <van-col span="14"></van-col>
              <van-col span="5" @click="toConfirmOrderHandler">立即下单</van-col>
           </van-row>
        </div>
      </div>
    </briup-FullPageLayout>
  </div>  
</template>
<script>
import FullPageLayout from '../../components/FullPageLayout'
import {mapState,mapActions,mapGetters,mapMutations} from 'vuex'
export default {
  data(){
    return {
      activeKey:0,
      value:0,
      categoryId:0
    }
  },
  created(){
    let index = this.$route.params.index;;
    this.activeKey = index;
    this.categoryId = this.categories[index].id;
    // 通过索引找到对应的栏目信息，然后再通过该栏目的id查找对应的商品
    // this.findProductsHandler(this.categories[index].id)
  },
  computed:{
    ...mapState("app",["shopcar"]),
    ...mapState("category",["categories"]),
    ...mapState("product",["products"]),
    ...mapGetters("product",["getProductsByCategoryId"]),
    ...mapGetters("app",["shopcar_total"])
    
  },
  components:{
    "briup-FullPageLayout":FullPageLayout
  },
  methods:{
    // ...mapActions("product",["findProductsByCategoryId"]),
    ...mapMutations("app",["alterShopCar"]),
    // 回退
    backHandler(){
      this.$router.back();
    },
    toConfirmOrderHandler(){
      this.$router.push("/confirmOrder")
    },
    // 点击左侧栏目，根据栏目查找对应商品列表
    findProductsHandler(id){
      this.categoryId = id;
    },
    stepChangerHandler(p){
      let line = {
        productId:p.id,
        productName:p.name,
        price:p.price,
        number:p.number
      }
      // 修改购物车
      this.alterShopCar(line);
    }
  }
}
</script>
<style scoped>
.left_nav {
  position: fixed;
  left: 0;
}
.products_container {
  margin-left: 85px;

}
.product {
  padding: 1em 0;
  border-bottom: 1px solid #ededed;
  position: relative;
}
.product .title {
  font-weight: bold;
}
.product .desc {
  font-size: 10px;
}
.product .price {
  color: #ff700d;
}
.product .step {
  position: absolute;
  bottom: 1em;
  right: .5em;
}
.shopcar {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 4em;
  background: rgba(0, 0, 0, .3);
  line-height: 4em;
  text-align: center;
  color: #ffffff;
}

</style>