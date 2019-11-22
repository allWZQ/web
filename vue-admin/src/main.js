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
//icon引入
import "./icons";
//解决UI vue3.1.0报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

Vue.use(ElementUI);
Vue.use(VueCompositionApi);

Vue.config.productionTip = false;

//runtime(运行模式)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
