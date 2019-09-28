import Vue from 'vue'
import './plugins/ant-design-vue.js'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import axios from 'axios'
import store from './store'


Vue.use(Vuex);
axios.defaults.withCredentials=true;
Vue.prototype.$axios = axios;
Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
