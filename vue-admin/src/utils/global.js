import { MessageBox } from "element-ui";
//全局注册，记得在main.js注入这个文件，才是全局
export default {
  install(Vue, options) {
    Vue.prototype.confirm = params => {
      MessageBox.confirm(params.content, params.Tips || "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: params.type || "warning",
        center: true
      })
        .then(() => {})
        .catch(() => {});
    };

    //可以在这里声明第二个方法
    // Vue.prototype.xxxxxx = () => {
    //   //方法
    // };
  }
};
//可以自定义vue全局插件在这里
