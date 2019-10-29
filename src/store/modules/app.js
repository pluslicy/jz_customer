import { get,post_json } from "../http";

export default {
  namespaced:true,
  state:{
    // 当前登录的用户信息
    user:null,
    // [{productId,name,price,number,}]
    shopcar:[],
    addresses:[],
    currentAddress:{}
  },
  getters:{
    shopcar_total(state){
      let total = 0
      state.shopcar.forEach((item)=>{
        total+= (item.number * item.price)
      });
      return total;
    }
  },
  mutations:{
    resetUser(state,user){
      state.user = user;
    },
    // {productId:2,price:3.0,number:1}
    alterShopCar(state,line){
      // [{productId:1,price:2.0,number:4}{productId:2,price:3.0,number:1}]
      let flag = state.shopcar.some(item=>item.productId === line.productId)
      if(flag){
        //购物车中存在要加入购物车的产品，只需要改变数量即可
        state.shopcar.forEach((item)=>{
          if(item.productId === line.productId){
            item.number = line.number;
          }
        })
      } else {
        state.shopcar.push(line);
      }
    },
    resetAddesses(state,addresses){
      state.addresses = addresses;
    },
    resetCurrentAddress(state,address){
      state.currentAddress = address;
    }
  },
  actions:{
    async login({dispatch},data){
      let result = await post_json("/user/login",data);
      let token = result.data.token;
      await dispatch("getUserInfo",token)
      
    },
    async getUserInfo({commit,dispatch},token){
      let result = await get("/user/info",{token});
      await commit("resetUser",result.data);
      // 查询地址
      dispatch("findAddressesByUserId",result.data.id);

    },
    findAddressesByUserId({commit},id){
      get("/address/findByCustomerId?id="+id)
      .then((result)=>{
        // 由于后台返回的数据与插件要求的数据格式不同，所以这里要转换一下
        let addresses = [];
        result.data.forEach((item)=>{
          let address = {
            id: item.id,
            name: "张辉",
            tel: item.telephone,
            address: item.province+""+item.city+""+item.area+""+item.address
          }
          addresses.push(address);
        })
        // 设置所有地址
        commit("resetAddesses",addresses);
        // 设置一个默认地址
        commit("resetCurrentAddress",addresses[0])
      })
    }
  }
}