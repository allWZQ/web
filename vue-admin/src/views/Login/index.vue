<template>
  <div id="login">
    <div class="box1">
      <!-- 登陆注册 -->
      <ul class="menu">
        <li
          v-for="item in menuTab"
          :key="item.id"
          :class="{ current: item.current }"
          @click="toggleMneu(item)"
        >
          {{ item.text }}
        </li>
      </ul>
      <!-- 表单 -->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="login-form"
        size="medium"
      >
        <el-form-item prop="username" class="item-from">
          <label>邮箱</label>
          <el-input
            type="text"
            v-model="ruleForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password" class="item-from">
          <label>密码</label>
          <el-input
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
          <label>确认密码</label>
          <el-input
            type="password"
            v-model="ruleForm.passwords"
            autocomplete="off"
            minlength="6"
            maxlength="16"
          ></el-input>
        </el-form-item>

        <el-form-item prop="code" class="item-from">
          <label>验证码</label>
          <el-row :gutter="11">
            <el-col :span="15">
              <el-input
                v-model.number="ruleForm.code"
                minlength="6"
                maxlength="6"
              ></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="success" class="block">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button
            type="danger"
            @click="submitForm('ruleForm')"
            class="login-btn block"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
// 引用外部方法
import {
  stripscript,
  validateEmail,
  validatepass,
  validateVcode
} from '@/utils/validate'
export default {
  name: 'login',
  //将你的数据绑定在这里,然后你好在template中调用
  // 表单
  data() {
    //验证邮箱
    var validateusername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else if (validateEmail(value)) {
        callback(new Error('用户名格式有误'))
      } else {
        callback() //true
      }
    }
    //验证密码
    var validatepassword = (rule, value, callback) => {
      this.ruleForm.password = stripscript(value)
      value = this.ruleForm.password
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (validatepass(value)) {
        callback(new Error('以字母开头，长度在6~18之间数字或字母'))
      } else {
        callback()
      }
    }
    //验证确认密码
    var validatepasswords = (rule, value, callback) => {
      //若干模块值为login，直接通过
      if (this.model === 'login') {
        callback()
      }
      this.ruleForm.passwords = stripscript(value)
      value = this.ruleForm.passwords

      if (value === '') {
        callback(new Error('请再次密码'))
      } else if (value != this.ruleForm.password) {
        callback(new Error('重复密码不正确'))
      } else {
        callback()
      }
    }

    //验证验证码
    var validatecode = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('验证码不能为空'))
      } else if (validateVcode(value)) {
        return callback(new Error('验证码格式有误'))
      } else {
        callback()
      }
    }
    // 登陆注册

    return {
      menuTab: [
        { text: '登陆', current: true, type: 'login' },
        { text: '注册', current: false, type: 'register' }
      ],

      //模块的值
      model: 'login',
      //表单的数据
      ruleForm: {
        username: '',
        password: '',
        passwords: '',
        code: ''
      },
      rules: {
        username: [{ validator: validateusername, trigger: 'blur' }],
        password: [{ validator: validatepassword, trigger: 'blur' }],
        passwords: [{ validator: validatepasswords, trigger: 'blur' }],
        code: [{ validator: validatecode, trigger: 'blur' }]
      }
    }
  },
  created() {},
  mounted() {},
  //写函数的地方
  methods: {
    //vue是数据驱动视图渲染
    toggleMneu(data) {
      this.menuTab.forEach(elem => {
        elem.current = false
      })
      //高光
      data.current = true
      //修改模块值
      this.model = data.type
    },
    // 表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
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
  li {
    text-align: center;
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    font-family: '萝莉体 第二版';
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
    font-family: '萝莉体 第二版';
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
