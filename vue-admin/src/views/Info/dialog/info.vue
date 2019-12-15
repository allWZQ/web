<template>
  <el-dialog
    title="新增"
    :visible.sync="dialogFlog"
    @close="close"
    width="580px"
  >
    <el-form :model="form">
      <el-form-item label="类型：" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题：" :label-width="formLabelWidth">
        <el-input v-model="form.name" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="概况：" :label-width="formLabelWidth">
        <el-input
          type="textarea"
          v-model="form.name"
          placeholder="请输入内容"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="danger" @click="dialogFormVisible = false"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>
<script>
import { ref, watch, reactive } from "@vue/composition-api";
export default {
  //父传子，单项数据流，不能反向做修改
  props: {
    flog: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    //声明弹窗按钮
    const dialogFlog = ref(false);
    const formLabelWidth = ref("70px");
    const form = reactive({
      name: "",
      region: "",
      date1: "",
      date2: "",
      delivery: false,
      type: [],
      resource: "",
      desc: ""
    });
    const close = () => {
      dialogFlog.value = false;
      emit("update:flog", false); //修饰器会在父容器修改的flog值为false
      //第二种方法
      //回调时需要做逻辑处理的时候，就不能用修饰器，反之就可以用修饰器
      //sync修饰器
      //emit("close", false);
    };
    watch(() => (dialogFlog.value = props.flog));
    return {
      dialogFlog,
      close,
      formLabelWidth,
      form
    };
  }
};
</script>
