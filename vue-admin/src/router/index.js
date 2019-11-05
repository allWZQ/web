import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login/index.vue";
import Console from "../views/Layout/index.vue";
import ConsoleIndex from "../views/Console/index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "Login"
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/console",
    name: "Console",
    component: Console,
    children: [
      {
        path: "/console",
        name: "/Console",
        component: ConsoleIndex
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
