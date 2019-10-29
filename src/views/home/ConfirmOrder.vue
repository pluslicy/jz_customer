<template>
  <div id="confirmOrder">
    <briup-FullPageLayout title="订单确认" @back="backHandler">
      <!-- 地址 -->
      <van-row class="line">
        <van-col :span="6" class="line-left">
          <van-icon name="location-o" />
        </van-col>
        <van-col :span="18" class="line-right">
          <div class="label">服务地址</div>
          <div @click="toAddressListHandler">
            {{currentAddress.name}} {{currentAddress.tel}}
            <br>
            {{currentAddress.address}}
          </div>
        </van-col>
      </van-row>
      <!-- 订单项 -->
      <van-row class="line">
        <van-col :span="6" class="line-left">
          <van-icon name="balance-list-o" />
        </van-col>
        <van-col :span="18" class="line-right">
          <div class="label">订单详情</div>
          <div>
            <van-row v-for="line in shopcar" :key="line.productId">
              <van-col :span="8">{{line.productName}}</van-col>
              <van-col :span="4">￥{{line.price}}</van-col>
              <van-col :span="4">x{{line.number}}</van-col>
              <van-col :span="8">￥{{line.number*line.price}}</van-col>
            </van-row>
            
            <van-row style="border-top:1px dotted #ededed">
              <van-col :span="16"></van-col>
              <van-col :span="8">￥{{shopcar_total}}</van-col>
            </van-row>
            
          </div>
        </van-col>
      </van-row>
      <!-- 服务时间 -->
      <van-row class="line">
        <van-col :span="6" class="line-left">
          <van-icon name="clock-o" />
        </van-col>
        <van-col :span="18" class="line-right">
          <div class="label">服务时间</div>
          <div @click="()=>{this.show = true}">
            {{currentDate}}
          </div>
        </van-col>
      </van-row>
      <!-- 支付方式 -->
      <van-row class="line">
        <van-col :span="6" class="line-left">
          <van-icon name="gold-coin-o" />
        </van-col>
        <van-col :span="18" class="line-right">
          <div class="label">支付方式</div>
          <div>第三方平台（支付宝）</div>
        </van-col>
      </van-row>
      <van-popup v-model="show" position="bottom">
        <van-datetime-picker v-model="currentDate" type="datetime"/>
      </van-popup>

      <!-- 按钮 -->
      <div style="position:fixed;bottom:0;width:100%" >
        <van-button  type="info" size="large" @click="confirmOrderHandler">确认订单</van-button>
      </div>
    </briup-FullPageLayout>
  </div>
</template>
<script>
import FullPageLayout from '../../components/FullPageLayout'
import {mapState,mapGetters,mapActions} from 'vuex'
import {Toast} from 'vant'

export default {
  data(){
    return {
      currentDate:new Date(),
      show:false
    }
  },
  components:{
    "briup-FullPageLayout":FullPageLayout
  },
  computed:{
    ...mapState("app",["user","shopcar","currentAddress"]),
    ...mapState("order",["message"]),
    ...mapGetters("app",["shopcar_total"]),
  },
  methods:{
    ...mapActions("order",["saveOrder"]),
    // 回退
    backHandler(){
      this.$router.back();
    },
    // 地址列表
    toAddressListHandler(){
      this.$router.push("/addressList");
    },
    confirmOrderHandler(){
      // 保存订单
      let order = {
        customerId:this.user.id,
        addressId:this.currentAddress.id,
        orderLines:this.shopcar
      }
      // console.log(order);
      this.saveOrder(order)
      .then(()=>{
        Toast.success(this.message);
        this.$router.push("/order")
      });
      
    }
  }
}
</script>
<style scoped>
.line  .line-left {
  padding: 1em 0;
  text-align: center;
  font-size: 24px;
}
.line  .line-right {
  padding: 1em 0;
  border-bottom: 1px solid #ccc;
}
.line  .line-right > .label {
  font-size: 12px;
  font-weight: bold;
  color: #999;
  line-height: 2em;
}
</style>