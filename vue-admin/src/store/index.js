import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import app from "./app";
import login from "./login";
export default new Vuex.Store({
  modules: {
    app,
    login
  }
});
