import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import firebaseVue from './firebase'
//import VueExcelXlsx from "vue-excel-xlsx";
import { BootstrapVue } from 'bootstrap-vue'
import VueSweetalert2 from 'vue-sweetalert2';
import './assets/scss/app.scss'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'sweetalert2/dist/sweetalert2.min.css';
import Chartkick from 'vue-chartkick'
import 'chart.js'
import 'animate.css';
import excel from 'vue-excel-export'
// Plugins
//Vue.use(VueExcelXlsx);
Vue.use(Chartkick)
Vue.use(VueSweetalert2);
Vue.use(BootstrapVue)
Vue.use(firebaseVue)
Vue.use(excel)
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
