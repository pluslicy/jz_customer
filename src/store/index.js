import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import category from './modules/category'
import product from './modules/product'
import order from './modules/order'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    app,
    category,
    product,
    order
  }
})
