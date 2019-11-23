import router from "./index";
import { getToken } from "../utils/app";

const whiteRouter = ["/login"]; //indexOf方法，返回字符第一次出现的位置

//路由守卫
router.beforeEach((to, from, next) => {
  console.log(to);
  if (getToken()) {
    next();
    /**
     * 1.to=/console
     * 2.to=/index
     */
    //路由动态添加，分配菜单，每个角色分配不同的菜单
    console.log("存在");
  } else {
    console.log("不存在");
    if (whiteRouter.indexOf(to.path) !== -1) {
      next(); //指向to参数
    } else {
      next("/login"); //路由指向
    }
    /**
     * 1.直接进入index的时候，参数to被改动成了"/index"，就会触发路由指向，就会跑beforeEach
     * 2.跑 beforeEach的时候，这一次next指向变成了"login",参数to被改成"/login"
     * 3.白名单判断存在，则直接执行next(),因为没有参数，所有不会在跑beforeEach
     */
  }
});
