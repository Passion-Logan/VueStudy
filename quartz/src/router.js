import Vue from "vue";
import Router from "vue-router";
import Quartz from "@/views/quartz/quartz";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Quartz
    }
  ]
});
