import {get,post,post_array_dots} from "../http"
export default {
  namespaced:true,
  state:{
    orders:[],
    message:""
  },
  getters:{
    ordersFilter(state){
      return (status)=>{
        return state.orders.filter(item=>item.status === status)
      }
    }
  },
  mutations:{
    resetOrders(state,orders){
      state.orders = orders;
    },
    resetMessage(state,message){
      state.message = message;
    }
  },
  actions:{
    async saveOrder({commit},order){
      let result = post_array_dots("/order/save",order)
      commit("resetMessage",result.statusText);
    },
    async findCustomerOrders({commit,rootState}){
      let result = await get("/order/query",{
        customerId:rootState.app.user.id
      })
      commit("resetOrders",result.data);
    },
    async findAllOrders({commit}){
      let result =await get("/order/findAll")
      commit("resetOrders",result.data);
    },
    async confirmOrder({dispatch},orderId){
      let result = await get("/order/confirmOrder",{orderId})
      dispatch("findCustomerOrders");
      return result;
    }
    
  }
}