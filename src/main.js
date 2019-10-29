import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/vant.js'
import "./common.css"
import moment from 'moment'
// vue组件全局导入
import OrderPane from './components/OrderPane'
Vue.component("briup-order-pane",OrderPane)
// vue过滤器
Vue.filter("datefmt",function(input){
  return moment(input).format('YYYY-MM-DD HH:mm:ss')
})


Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
