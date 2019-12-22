import { GetCategory } from "../../api/news";
const actions = {
  // 可以回调处理事情
  //异步，请求接口返回数据后，接着去做别的事情
  /*接口A，接口B
   *B接口需要A接口的参数
   */
  getInfoCategory(content, repuestData) {
    return new Promise((resolve, reject) => {
      GetCategory({})
        .then(response => {
          resolve(response.data.data.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};
export default {
  //处理命名空间问题
  namespaced: true,
  actions
};
