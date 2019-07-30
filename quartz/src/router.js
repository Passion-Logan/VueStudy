import Vue from "vue";
import Router from "vue-router";

// 组件模块
import Home from "./components/quartz";
import Quartz from "./components/quartz";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "quartz",
      name: "quartz",
      component: Quartz
    }
  ]
});
