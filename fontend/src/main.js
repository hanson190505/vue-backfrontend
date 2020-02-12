import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/base.css'
import store from './store';
import './icons' // icon
import * as filters from './filters' // global filters

Vue.use(Element, {
  size: 'mini',
  zIndex: 3000
})

Vue.config.productionTip = false
//全局注册vuex实例,store
Vue.prototype.$store = store
// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')