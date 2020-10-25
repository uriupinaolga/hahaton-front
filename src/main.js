import Vue from 'vue'
import App from './App.vue'
import AOS from 'aos'
import 'aos/dist/aos.css'


Vue.config.productionTip = false

Vue.use(AOS)
new Vue({
  render: h => h(App),
}).$mount('#app')
