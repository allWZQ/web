import Vue from "vue";
import Vuex from "vuex";
//import axios from "axios";
import { Login } from "@/api/login.js";
import Cookie from "js-cookie";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //导航栏打开的状态
    //html5获取
    // isCollapse: JSON.parse(localStorage.getItem("isCollapse")) || false
    //cookie
    isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false
  },
  //获取计算state的属性
  getters: {
    isCollapse: state => state.isCollapse
  },
  //修改stater属性
  mutations: {
    SET_COLLAPSE(state) {
      state.isCollapse = !state.isCollapse;
      //html5本地存储
      // localStorage.setItem("isCollapse", JSON.stringify(state.isCollapse));
      sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse));
      //Cookie存储
      // Cookie.set("isCollapse", JSON.stringify(state.isCollapse));
    }
  },
  actions: {
    // 可以回调处理事情
    //异步，请求接口返回数据后，接着去做别的事情
    /*接口A，接口B
     *B接口需要A接口的参数
     */
    login(content, repuestData) {
      return new Promise((resolve, reject) => {
        Login(repuestData)
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
});
