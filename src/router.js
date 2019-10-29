import Vue from 'vue'
import store from './store'
import Router from 'vue-router'
import Home from './views/home/index.vue'
import Order from './views/order/index.vue'
import My from './views/my/index.vue'
import CategoryList from './views/home/CategoryList'
import ConfirmOrder from './views/home/ConfirmOrder'
import addressList from './views/home/AddressList'
import Login from './views/Login'
Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/categoryList/:index',
      name: 'categoryList',
      component: CategoryList
    },
    {
      path: '/order',
      name: 'order',
      component: Order
    },
    {
      path: '/addressList',
      name: 'addressList',
      component: addressList
    },
    {
      path: '/confirmOrder',
      name: 'confirmOrder',
      component: ConfirmOrder
    },
    {
      path: '/my',
      name: 'my',
      component: My
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
});

router.beforeEach((to, from, next) => {
  if(to.path === "/login" || store.state.app.user){
    next();
  } else {
    next("/login")
  }
})

export default router;
