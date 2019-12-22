<template>
  <el-dialog
    title="新增"
    :visible.sync="data.dialogFlog"
    @close="close"
    width="580px"
    @opened="openDialog"
  >
    <el-form :model="data.form" ref="addInfoForm">
      <el-form-item label="类型：" :label-width="data.formLabelWidth">
        <el-select v-model="data.form.category" placeholder="请选择">
          <el-option
            v-for="item in data.categoryOption"
            :key="item.id"
            :label="item.category_name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题：" :label-width="data.formLabelWidth">
        <el-input v-model="data.form.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="概况：" :label-width="data.formLabelWidth">
        <el-input
          type="textarea"
          v-model="data.form.content"
          placeholder="请输入内容"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="danger" :loading="data.submit_loading" @click="submit()"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>
<script>
import { AddInfo } from "../../../api/news.js";
import { watch, reactive } from "@vue/composition-api";
export default {
  //父传子，单项数据流，不能反向做修改
  props: {
    flog: {
      type: Boolean,
      default: false
    },
    category: {
      type: Array,
      default: () => []
    }
  },
  setup(props, { root, emit, refs }) {
    //声明弹窗按钮

    const data = reactive({
      dialogFlog: false, //窗口标记
      formLabelWidth: "70px",
      form: {
        category: "",
        title: "",
        content: ""
      },
      //分类下拉
      categoryOption: [],
      //按钮加载
      submit_loading: false
    });
    //方法
    const submit = () => {
      let requestData = {
        category: data.form.category,
        title: data.form.title,
        content: data.form.content
      };
      if (!data.form.category || !data.form.title || !data.form.content) {
        root.$message({
          message: "请填写完整",
          type: "error"
        });
        return false;
      }
      data.submit_loading = true;
      AddInfo(requestData)
        .then(response => {
          root.$message({
            message: response.data.message,
            type: "success"
          });
          data.submit_loading = false;
          //重置表单
          //refs.addInfoForm.resetFields();
          resetForm();
        })
        .catch(error => {
          data.submit_loading = false;
        });
    };
    const resetForm = () => {
      data.form.category = "";
      data.form.title = "";
      data.form.content = "";
    };
    //el-ui方法
    const close = () => {
      data.dialogFlog = false;
      emit("update:flog", false); //修饰器会在父容器修改的flog值为false
      //第二种方法
      //回调时需要做逻辑处理的时候，就不能用修饰器，反之就可以用修饰器
      //sync修饰器
      //emit("close", false);

      //重置表单
      resetForm();
    };
    const openDialog = () => {
      console.log(props.category);
      data.categoryOption = props.category;
    };
    watch(() => (data.dialogFlog = props.flog));
    return {
      data,
      close,
      openDialog,
      submit
    };
  }
};
</script>
