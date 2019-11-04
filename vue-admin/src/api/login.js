import service from "@/utils/request.js";
//获取验证码的接口
export function GetSms(data) {
  //触发
  return service.request({
    method: "post",
    url: "/getSms/",
    data: data
    // data: data ,左边是data是变量名（key）后台接收的，右边data是接收的参数
    //如果两者同名的情况下，可以只写一个 data
  });
}
//获取用户角色

//获取登陆的接口
export function Login(data) {
  return service.request({
    method: "post",
    url: "/Login/",
    data: data
  });
}

//获取注册的接口
export function Register(data) {
  return service.request({
    method: "post",
    url: "/register/",
    data: data
  });
}
