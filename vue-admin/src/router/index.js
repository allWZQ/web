import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import Layout from "@/views/Layout";

const routes = [
  {
    path: "/",
    redirect: "Login",
    meta: {
      name: "主页"
    },
    hidden: true
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      name: "登陆"
    },
    hidden: true,
    component: () => import("../views/Login/index.vue")
  },
  //父1
  {
    path: "/console",
    name: "Console",
    redirect: "index",
    meta: {
      name: "控制台",
      icon: "kzt"
    },
    component: Layout,
    children: [
      {
        path: "/index",
        name: "Index",
        meta: {
          name: "首页"
        },
        component: () => import("../views/Console/index.vue")
      }
    ]
  },
  //父2
  {
    path: "/info",
    name: "Info",
    meta: {
      name: "信息管理",
      icon: "menu"
    },
    component: Layout,
    children: [
      {
        path: "/infoIndex",
        name: "InfoIndex",
        meta: {
          name: "信息列表"
        },
        component: () => import("../views/Info/index.vue")
      },
      {
        path: "/infocategory",
        name: "InfoCategory",
        meta: {
          name: "信息分类"
        },
        component: () => import("../views/Info/category.vue")
      }
    ]
  },
  //父3
  {
    path: "/user",
    name: "User",
    meta: {
      name: "用户管理",
      icon: "user"
    },
    component: Layout,
    children: [
      {
        path: "/userindex",
        name: "UserIndex",
        meta: {
          name: "用户列表"
        },
        component: () => import("../views/User/index.vue")
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
