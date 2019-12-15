import axios from "axios";
import { Message } from "element-ui";
import { getToken, getUserName } from "../utils/app";

//创建axios，赋给变量service
const BASEURL = process.env.NODE_ENV === "production" ? "" : "/devApi";
const service = axios.create({
  baseURL: BASEURL, //相当于http://192.168.0.107:8080/devApi=http://www.web-jshtml.cn/productapi或/devApi
  timeout: 60000 //超时
  //网络请求接口，假设 5000
  //timeout尽量超过请求的时间
});
// 添加请求拦截器
/**
 * 请求接口前，做一些数据处理
 */

service.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    //后台需要前端这边添加相关的参数（在request Headers 请求头添加东西）
    //最终目的是在请求头添加参数
    config.headers["Tokey"] = getToken();
    config.headers["UserName"] = getUserName();
    //sui     config.header.sui="222222"
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
/**
 * 请求接口后，后台返回什么数据进行拦截
 */
service.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    let data = response.data;
    //业务需求
    if (data.resCode !== 0) {
      //error()里面添加的内容是后台服务器返回给我们的，我们不能写死了
      Message.error(data.message);
      return Promise.reject(data);
    } else {
      return response;
      //return Promise.resolve(data);
    }
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

//使用export default时，文件import不需要{}，但不能同时存在多个default
export default service;
