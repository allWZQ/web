<template>
  <div class="box">
    <!-- 标题数据 -->
    <el-row :gutter="15">
      <el-col :span="4">
        <div class="label-wrap category">
          <label for="">类型：</label>
          <div class="warp-content">
            <el-select
              v-model="categoryValue"
              placeholder="请选择"
              style="width:100%;"
            >
              <el-option
                v-for="item in options.category"
                :key="item.id"
                :label="item.category_name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="label-wrap date">
          <label for="">日期：&nbsp;</label>
          <div class="warp-content">
            <el-date-picker
              style="width:100%;"
              v-model="dateValue"
              type="datetimerange"
              align="right"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00', '08:00:00']"
            >
            </el-date-picker>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="label-wrap key-word">
          <label for="">关键字：</label>
          <div class="warp-content">
            <el-select v-model="searchKey" style="width:100%;">
              <el-option
                v-for="item in searchsKey"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <el-input
          style="width:100%;"
          v-model="search"
          placeholder="请输入内容"
        ></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="danger" style="width:100%;">搜索</el-button>
      </el-col>
      <el-col :span="3">
        <div class="box1">1</div>
      </el-col>
      <el-col :span="2">
        <el-button
          type="danger"
          class="pull-right"
          style="width:100%;"
          @click="dialogInfo = true"
          >新增</el-button
        >
      </el-col>
    </el-row>
    <div class="black-space-30"></div>
    <!-- 表格数据 -->
    <el-table :data="tableData.item" border style="width: 100%">
      <el-table-column type="selection" width="45"> </el-table-column>
      <el-table-column prop="title" label="标题" width="830"></el-table-column>
      <el-table-column
        prop="categoryId"
        label="类型"
        width="130"
      ></el-table-column>
      <el-table-column prop="createDate" label="日期" width="240">
      </el-table-column>
      <el-table-column prop="user" label="管理员" width="115"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="deleteItem"
            >删除</el-button
          >
          <el-button type="success" size="mini" @click="dialogInfo = true"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="black-space-30"></div>
    <!-- 底部分页 -->
    <el-row>
      <el-col :span="12">
        <el-button size="medium" @click="deleteAll">批量删除</el-button>
      </el-col>
      <el-col :span="12">
        <el-pagination
          class="pull-right"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="1"
          :page-sizes="[10, 20, 50, 100]"
          layout="total,sizes,prev, pager, next"
          :total="total"
        >
        </el-pagination>
      </el-col>
    </el-row>
    <!-- 新增弹窗 -->
    <dialogInfo
      :flog.sync="dialogInfo"
      @close="closeDialog"
      :category="options.category"
    />
  </div>
</template>
<script>
import { GetList } from "../../api/news.js";
import DialogInfo from "../Info/dialog/info";
import { global } from "@/utils/globalV3";
//import { common } from "../../api/common.js";
import { reactive, ref, watch, onMounted } from "@vue/composition-api";
export default {
  name: "index",
  components: {
    DialogInfo
  },
  setup(props, { root }) {
    //声明调用方法
    const { str, confirm } = global();
    //const { categoryItem, getInfoCategory } = common();

    const options = reactive({
      category: []
    });
    //声明标题数据
    const categoryValue = ref("");
    const dateValue = ref("");
    const searchKey = ref("id");
    const searchsKey = reactive([
      { value: "id", label: "ID" },
      { value: "title", label: "标题" }
    ]);
    const search = ref("");
    //声明表格数据
    const tableData = reactive({
      item: []
    });
    //分页
    const total = ref(0);
    //yema
    const page = reactive({
      pageNumber: 1,
      pageSize: 10
    });
    //声明弹窗按钮
    const dialogInfo = ref(false);
    //方法
    //获取列表
    const getList = () => {
      let requestData = {
        categoryId: "",
        startTiem: "",
        endTime: "",
        title: "",
        id: "",
        pageNumber: page.pageNumber,
        pageSize: page.pageSize
      };
      GetList(requestData)
        .then(response => {
          console.log(response.data.data.data);
          tableData.item = response.data.data.data;
          total.value = response.data.data.total;
        })
        .catch(error => {});
    };
    const handleSizeChange = val => {
      page.pageSize = val;
      console.log(`每页 ${val} 条`);
      getList();
    };
    const handleCurrentChange = val => {
      page.pageNumber = val;
      console.log(`当前页: ${val}`);
      getList();
    };
    const closeDialog = () => {
      //回调（可以用来做逻辑性事件）
      dialogInfo.value = false;
    };
    //删除
    const deleteItem = () => {
      //传参尽可能传对象的方式，方便维护
      confirm({
        content: "此操作将永久删除该条信息, 是否继续?",
        Tips: "警告",
        fn: confirmDelete,
        id: "1"
      });
      // root.confirm({
      //   content: "此操作将永久删除该条信息, 是否继续?",
      //   Tips: "警告",
      //   fn: confirmDelete
      // });
    };
    //删除全部
    const deleteAll = () => {
      confirm({
        content: "删除全部信息, 是否继续?",
        type: "info",
        fn: confirmDelete,
        id: "2"
      });

      // root.confirm({
      //   content: "删除全部信息, 是否继续?",
      //   type: "info",
      //   fn: confirmDelete
      // });
    };
    //监听
    watch(str, () => {
      console.log(str.value);
    });
    //vue3.0
    // watch(
    //   () => categoryItem.item,
    //   value => {
    //     options.category = value;
    //   }
    // );
    const confirmDelete = () => {};
    const getInfoCategory = () => {
      root.$store.dispatch("common/getInfoCategory").then(response => {
        options.category = response;
      });
    };
    //获取接口
    onMounted(() => {
      //获取分类
      getInfoCategory();
      //获取列表
      getList();
    });
    return {
      options,
      categoryValue,
      dateValue,
      searchsKey,
      searchKey,
      search,
      tableData,
      handleSizeChange,
      handleCurrentChange,
      dialogInfo,
      closeDialog,
      deleteItem,
      deleteAll,
      confirmDelete,
      total,
      page
    };
  }
};
</script>
<style lang="scss">
@import "../../styles/config.scss";
.label-wrap {
  &.category {
    @include labelDom(left, 60, 40);
  }
  &.date {
    @include labelDom(right, 93, 40);
  }
  &.key-word {
    @include labelDom(right, 99, 40);
  }
}
.box1 {
  opacity: 0;
}
</style>
