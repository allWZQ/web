import Vue from "vue";
import Vuex from "vuex";
//import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //导航栏打开的状态
    isCollapse: false
  },
  //获取计算state的属性
  getters: {},
  //修改stater属性
  mutations: {
    SET_COLLAPSE(state) {
      state.isCollapse = !state.isCollapse;
    }
  },
  actions: {}
});
