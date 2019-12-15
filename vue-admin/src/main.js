import Vue from "vue";
//api
import VueCompositionApi from "@vue/composition-api";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store/index.js";
//UI引入
import ElementUI from "element-ui";
import Router from "vue-router";
import "element-ui/lib/theme-chalk/index.css";
//引入token
import "./router/housekeeper";
//icon引入
import "./icons";
//自定义全局方法
//import global from "./utils/global";
//自定义全局组件
//Vue.use(global);
Vue.use(ElementUI);
Vue.use(VueCompositionApi);

Vue.config.productionTip = false;

//解决UI vue3.1.0报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

//runtime(运行模式)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
