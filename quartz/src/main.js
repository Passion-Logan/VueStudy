import Vue from "vue";
import './plugins/axios'
import App from "./App.vue";
import axios from "axios";
import "./plugins/element.js";

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
