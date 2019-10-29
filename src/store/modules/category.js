import {get} from "../http"
export default {
  namespaced:true,
  state:{
    categories:[]
  },
  getters:{
    getCategories(state){
      return function(n){
        return state.categories.slice(0,n)
      }
    }
  },
  mutations:{
    resetCategories(state,categories){
      state.categories = categories;
    }
  },
  actions:{
    // 查询所有的一级栏目
    findOneLevelCategory({commit}){
      get("/category/findAll")
      .then((result)=>{
        commit("resetCategories",result.data);
      })
    }
  }
}