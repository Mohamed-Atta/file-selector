import Vue from 'vue'
import App from './App.vue'
import './assets/styles/main.css'
import Vuex from 'vuex'
import storePlugin from './storePlugin'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(storePlugin)

new Vue({
  render: h => h(App),
}).$mount('#app')
