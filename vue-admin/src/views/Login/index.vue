<template>
  <div id="login">
    <div class="box1">
      <!-- 登陆注册 -->
      <ul class="menu">
        <li
          v-for="item in menuTab"
          :key="item.id"
          :class="{ current: item.current }"
          @click="toggleMenu(item)"
        >
          {{ item.text }}
        </li>
      </ul>
      <!-- 表单 -->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="Form"
        class="login-form"
        size="medium"
      >
        <el-form-item prop="username" class="item-from">
          <label for="username">邮箱</label>
          <el-input
            id="username"
            type="text"
            v-model="ruleForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password" class="item-from">
          <label for="password">密码</label>
          <el-input
            id="password"
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            minlength="6"
            maxlength="16"
          ></el-input>
        </el-form-item>

        <el-form-item
          prop="passwords"
          class="item-from"
          v-show="model === 'register'"
        >
          <label for="passwords">确认密码</label>
          <el-input
            id="passwords"
            type="password"
            v-model="ruleForm.passwords"
            autocomplete="off"
            minlength="6"
            maxlength="16"
          ></el-input>
        </el-form-item>

        <el-form-item prop="code" class="item-from">
          <label for="code">验证码</label>
          <el-row :gutter="11">
            <el-col :span="15">
              <el-input
                id="code"
                v-model="ruleForm.code"
                minlength="6"
                maxlength="6"
              ></el-input>
            </el-col>
            <el-col :span="9">
              <el-button
                type="success"
                class="block"
                @click="getSms()"
                :disabled="codeButtonStatus.status"
                >{{ codeButtonStatus.text }}</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button
            type="danger"
            :disabled="loginButtonStatus"
            @click="submitForm('Form')"
            class="login-btn block"
            >{{ model === "login" ? "登陆" : "注册" }}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
// 引用外部方法
import sha1 from "js-sha1";
import { Message } from "element-ui";
import { GetSms, Register, Login } from "@/api/login.js";
import { reactive, ref, onMounted } from "@vue/composition-api";
import {
  stripscript,
  validateEmail,
  validatepass,
  validateVcode
} from "@/utils/validate";
export default {
  name: "login",
  //将你的数据绑定在这里,然后你在template中调用
  //setup（props,context）
  /**
  attrs:(...)==this.$attrs
  emit:(...)==this.$emit
  listeners:(...)==this.$listeners
  parent:(...)==this.parent
  refs:(...)==this.refs
  root:(...)==this
*/
  setup(props, { refs, root }) {
    // 表单
    //验证邮箱
    let validateusername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (validateEmail(value)) {
        callback(new Error("用户名格式有误"));
      } else {
        callback(); //true
      }
    };
    //验证密码
    let validatepassword = (rule, value, callback) => {
      ruleForm.password = stripscript(value);
      value = ruleForm.password;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (validatepass(value)) {
        callback(new Error("以字母开头，长度在6~18之间数字或字母"));
      } else {
        if (ruleForm.passwords !== "") {
          refs.Form.validateField("passwords");
        }
        callback();
      }
    };
    //验证确认密码
    let validatepasswords = (rule, value, callback) => {
      //若模块值为login，直接通过
      if (model.value === "login") {
        callback();
      }
      ruleForm.passwords = stripscript(value);
      value = ruleForm.passwords;
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != ruleForm.password) {
        callback(new Error("重复密码不正确"));
      } else {
        callback();
      }
    };
    //验证验证码
    let validatecode = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("验证码不能为空"));
      } else if (validateVcode(value)) {
        return callback(new Error("验证码格式有误"));
      } else {
        callback();
      }
    };
    //声明数据
    const menuTab = reactive([
      { text: "登陆", current: true, type: "login" },
      { text: "注册", current: false, type: "register" }
    ]);
    //模块值
    const model = ref("login");
    //登陆按钮禁用状态

    const loginButtonStatus = ref(true);
    //验证码按钮状态
    const codeButtonStatus = reactive({
      //验证码按钮禁用状态
      status: false,
      //验证码的文本状态
      text: "获取验证码"
    });
    //倒计时
    const timer = ref(null);
    //表单的数据
    const ruleForm = reactive({
      username: "",
      password: "",
      passwords: "",
      code: ""
    });
    //表单的验证
    const rules = reactive({
      username: [{ validator: validateusername, trigger: "blur" }],
      password: [{ validator: validatepassword, trigger: "blur" }],
      passwords: [{ validator: validatepasswords, trigger: "blur" }],
      code: [{ validator: validatecode, trigger: "blur" }]
    });
    //不建议在一个方法里，放入过多的事件,尽量把相同的事情封装一个方法里面，然后通过调用函数进行执行
    //声明函数
    //vue是数据驱动视图渲染
    const toggleMenu = data => {
      menuTab.forEach(elem => {
        elem.current = false;
      });
      //高光
      data.current = true;
      //修改模块值
      model.value = data.type;
      resetFromData();
      clearCountDown();
    };
    //清除表单数据方法
    const resetFromData = () => {
      //重置表单
      //this.$refs[formName].resetFields();  2.0写法
      refs.Form.resetFields();
    };
    //更新按钮状态方法
    const updataButtonStatus = parameter => {
      codeButtonStatus.status = parameter.status;
      codeButtonStatus.text = parameter.text;
    };
    // 获取验证码接口
    const getSms = () => {
      //前端拦截提示
      //邮箱是否为空
      if (ruleForm.username == "") {
        root.$message.error("请填写您的邮箱!");
        return false;
      }
      //邮箱格式是否正确真实
      if (validateEmail(ruleForm.username)) {
        root.$message.error("请填写正确邮箱格式!");
        return false;
      }
      //请求的接口,获取验证码
      let requestData = {
        username: ruleForm.username,
        module: model.value
      };
      //修改获取验证码状态
      updataButtonStatus({
        status: true,
        text: "已发送"
      });
      //延时多长时间
      setTimeout(() => {
        //获取验证码后台接口结果判断
        GetSms(requestData)
          .then(response => {
            let data = response.data;
            root.$message({
              message: data.message,
              type: "success"
            });
            //启用登陆或注册按钮
            loginButtonStatus.value = false;
            //调定时器，倒计时
            countDown(5);
            console.log(data);
          })
          .catch(error => {
            console.log(error);
          });
      }, 2000);
    };
    // 提交表单
    const submitForm = formName => {
      refs[formName].validate(valid => {
        //表单验证通过
        if (valid) {
          model.value === "login" ? login() : register();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };
    //登陆
    const login = () => {
      let requestData = {
        username: ruleForm.username,
        password: sha1(ruleForm.password),
        code: ruleForm.code
      };
      Login(requestData)
        .then(response => {
          console.log("登陆成功");
          console.log(response);
          //路由的页面跳转
          root.$router.push({
            name: "Console"
            //传参
            // params:{
            //   id:"",
            //   user:""
            // }
          });
        })
        .catch(error => {
          console.log(error);
        });
    };
    //注册
    const register = () => {
      let requestData = {
        username: ruleForm.username,
        password: sha1(ruleForm.password),
        code: ruleForm.code,
        module: model.value
      };
      //注册的接口
      Register(requestData)
        .then(response => {
          let data = response.data;
          root.$message({
            message: data.message,
            type: "success"
          });
          //注册成功后
          toggleMenu(menuTab[0]);
          clearCountDown();
        })
        .catch(error => {
          console.log(error);
        });
    };
    //倒计时
    const countDown = number => {
      //遗留BUG：0，60没有
      //判断是否存在别的定时器，存在则清除
      if (timer.value) {
        clearInterval(timer.value);
      }
      //setInterval 不断的执行，需要条件才会停止
      let time = number;
      timer.value = setInterval(() => {
        time--;
        console.log(time);
        if (time === 0) {
          //setInterval 定时器清除
          clearInterval(timer.value);
          updataButtonStatus({
            status: false,
            text: "重新发送"
          });
        } else {
          codeButtonStatus.text = `倒计时${time}秒`;
        }
      }, 1000);
    };
    //清除倒计时定时器
    const clearCountDown = () => {
      //还原验证码状态
      updataButtonStatus({
        status: false,
        text: "获取验证码"
      });
      //清除倒计时
      clearInterval(timer.value);
    };
    //生命周期
    //挂载完成后
    onMounted(() => {});
    return {
      menuTab,
      model,
      loginButtonStatus,
      codeButtonStatus,
      toggleMenu,
      submitForm,
      ruleForm,
      rules,
      getSms
    };
  }
};
</script>
<style lang="scss" scoped>
//全局样式
#login {
  height: 100vh;
  background-color: rgb(0, 67, 105);
}
// 登陆注册框
.box1 {
  border: 1px solid red;
  width: 300px;
  margin: auto;
}
//登陆注册按钮
.menu {
  border: 1px solid red;
  text-align: center;
  li {
    text-align: center;
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    font-family: "萝莉体 第二版";
    color: rgb(226, 226, 226);
    //使其圆润
    border-radius: 10px;
    //鼠标变成手势
    cursor: pointer;
  }
  .current {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
//表单样式
.login-form {
  border: 1px solid red;
  margin-top: 29px;
  label {
    border: 1px solid red;
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    font-family: "萝莉体 第二版";
    color: rgb(226, 226, 226);
  }
  .item-from {
    margin-bottom: 13px;
  }
  .block {
    width: 100%;
    display: block;
  }
  .login-btn {
    margin-top: 19px;
  }
}
</style>
