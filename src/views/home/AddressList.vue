<template>
  <div id="addressList">
    <briup-FullPageLayout title="地址列表" @back="backHandler">
      <van-address-list
        v-model="chosenAddressId"
        :list="addresses"
        add-button-text="确认"
        @add="onAdd"
        @select="selectAddressHandler"
        @edit="onEdit" />
    </briup-FullPageLayout>
  </div>  
</template>
<script>
import FullPageLayout from '../../components/FullPageLayout'
import {mapState,mapMutations} from 'vuex'
export default {
  data() {
    return {
      chosenAddressId: 0
    }
  },
  components:{
    "briup-FullPageLayout":FullPageLayout
  },
  computed:{
    ...mapState("app",["addresses","currentAddress"])
  },
  methods:{
    ...mapMutations("app",["resetCurrentAddress"]),
    // 回退
    backHandler(){
      this.$router.back();
    },
    onAdd(id) {
      this.backHandler();
    },
    selectAddressHandler(item){
      this.resetCurrentAddress(item);
    },
    onEdit(item, index) {
      alert('编辑地址:' + index);
    }
  }
}
</script>
<style scoped>

</style>