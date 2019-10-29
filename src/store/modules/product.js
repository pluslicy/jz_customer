import {get} from "../http"
export default {
  namespaced:true,
  state:{
    products:[]
  },
  getters:{
    // 根据栏目id在products中筛选出符合条件的值
    getProductsByCategoryId(state){
      return (categoryId)=>{
        return state.products.filter((item)=>{
          return item.categoryId === categoryId
        })
      }
    },
    // 获取前几个
    getProducts(state){
      return function(n){
        return state.products.slice(0,n)
      }
    }
  },
  mutations:{
   resetProducts(state,products){
     state.products = products;
   }
  },
  actions:{
    // 通过栏目id查询商品
   findProductsByCategoryId({commit},id){
    get("/product/findByCategoryId?id="+id)
      .then((result)=>{
        // 为product添加一个number属性
        result.data.forEach((item)=>{
          item.number = 0;
        })
        // 将查询到的数据更新到state中
        commit("resetProducts",result.data)
      })
    },
    // 查询所有的商品信息
    findAllProducts({commit}){
      get("/product/findAll")
      .then((result)=>{
        // 为product添加一个number属性
        result.data.forEach((item)=>{
          item.number = 0;
        })
        commit("resetProducts",result.data)
      })
    }
      
  }
}