import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import './plugins/element.js'

import axios from 'axios'
import store from './store'

Vue.prototype.$http = axios.create({
  baseURL:'https://www.someonethere.ml/'
})

axios.interceptors.request.use(function(config){
  return config;
},
function(error){
  return Promise.reject(error);
})

axios.interceptors.response.use(function(response){
  return response;
},
function(error){
  return Promise.reject(error);
})


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
