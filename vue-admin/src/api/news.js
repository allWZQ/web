import service from "../utils/request";
//列表

//新增

//编辑

//删除

//一节分类添加
export function AddFirstCategory(data) {
  return service.request({
    method: "post",
    url: "/news/addFirstCategory/",
    data: data
  });
}
//获取信息分类
export function GetCategory(data) {
  return service.request({
    method: "post",
    url: "/news/getCategory/",
    data: data
  });
}
//删除信息分类
export function DeleteCategory(data) {
  return service.request({
    method: "post",
    url: "/news/deleteCategory/",
    data: data
  });
}
//修改信息分类
export function EditCategory(data) {
  return service.request({
    method: "post",
    url: "/news/editCategory/",
    data: data
  });
}
