<template>
  <div id="category">
    <el-button type="danger" @click="addfirst({ type: 'category_first_add' })"
      >添加一级分类</el-button
    >
    <hr class="hr-e9e9e9" />
    <div>
      <el-row :gutter="30">
        <el-col :span="8">
          <div class="category-wrap">
            <div
              class="category"
              v-for="firstItem in category.item"
              :key="firstItem.id"
            >
              <!-- 一级分类 -->
              <h4>
                <svg-icon iconClass="add" className="add" />
                {{ firstItem.category_name }}
                <div class="button-group">
                  <el-button
                    size="mini"
                    type="danger"
                    @click="
                      editCategory({
                        data: firstItem,
                        type: 'category_first_edit'
                      })
                    "
                    round
                    >编辑</el-button
                  >
                  <el-button size="mini" type="success" round
                    >添加子级</el-button
                  >
                  <el-button
                    size="mini"
                    round
                    @click="deleteCategoryComfirm(firstItem.id)"
                    >删除</el-button
                  >
                </div>
              </h4>
              <!-- 子级分类 -->
              <ul v-if="firstItem.children">
                <li
                  v-for="childrenItem in firstItem.children"
                  :key="childrenItem.id"
                >
                  {{ childrenItem.category_name }}
                  <div class="button-group">
                    <el-button size="mini" type="danger" round>编辑</el-button>
                    <el-button size="mini" type="" round>删除</el-button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <h4 class="menu-title">一级分类编辑</h4>
          <el-form class="form-wrap" label-width="142px" ref="categoryForm">
            <el-form-item label="一级菜单名称：" v-if="category_first_input">
              <el-input
                v-model="form.categoryName"
                :disabled="category_first_disabled"
              ></el-input>
            </el-form-item>
            <el-form-item label="二级菜单名称：" v-if="category_children_input">
              <el-input
                v-model="form.secCategoryName"
                :disabled="category_children_disabled"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="danger"
                @click="submit"
                :loading="submit_button_loading"
                :disabled="submit_button_disabled"
                >确定</el-button
              >
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { AddFirstCategory, DeleteCategory, EditCategory } from "../../api/news";
import { global } from "@/utils/globalV3";
import { reactive, ref, onMounted, watch } from "@vue/composition-api";
import { common } from "../../api/common.js";
export default {
  name: "category",
  setup(props, { root }) {
    //数据调用
    //获取
    const { categoryItem, getInfoCategory } = common();

    //数据
    const form = reactive({ categoryName: "", secCategoryName: "" });
    const category = reactive({
      item: [],
      //当前临时数据
      current: []
    });
    const submit_button_loading = ref(false);
    const category_first_input = ref(true);
    const category_children_input = ref(true);
    const category_first_disabled = ref(true);
    const category_children_disabled = ref(true);
    const submit_button_disabled = ref(true);
    const deleteId = ref("");
    const submit_button_type = ref("");
    //声明调用工具类方法global
    const { str, confirm } = global();
    watch(str, () => {
      console.log(str.value);
    });
    //方法
    const addfirst = params => {
      submit_button_type.value = params.type;
      category_first_input.value = true;
      category_first_disabled.value = false;
      category_children_input.value = false;
      submit_button_disabled.value = false;
    };
    //添加按钮
    const submit = () => {
      if (submit_button_type.value == "category_first_add") {
        addFirstCategory();
      }
      if (submit_button_type.value == "category_first_edit") {
        editFirstCategory();
      }
    };
    const addFirstCategory = () => {
      if (form.categoryName === "") {
        root.$message({
          type: "error",
          message: "添加不能为空"
        });
        return false;
      }
      //按钮加载状态
      submit_button_loading.value = true;
      AddFirstCategory({ categoryName: form.categoryName })
        .then(response => {
          let data = response.data;
          console.log(response);
          if (data.resCode === 0) {
            root.$message({
              type: "success",
              message: data.message
            });
            //如果直接获取分类接口，会浪费资源
            //push 数组方法，添加到数组的末尾
            category.item.push(response.data.data);
          }
          submit_button_loading.value = false;
          //清除表单数据
          form.categoryName = "";
          form.secCategoryName = "";
        })
        .catch(error => {
          submit_button_loading.value = false;
          //清除表单数据
          form.categoryName = "";
          form.secCategoryName = "";
        });
    };

    //删除
    const deleteCategoryComfirm = categoryID => {
      deleteId.value = categoryID;
      confirm({
        content: "此操作将永久删除该条信息, 是否继续?",
        Tips: "警告",
        //点击确定后的方法
        fn: deleteCategory,
        //点击取消后的方法
        catchfn: () => {
          deleteId.value = "";
        }
      });
    };
    //点击确定后then中fn的方法
    const deleteCategory = () => {
      //接口（删除）
      DeleteCategory({ categoryId: deleteId.value })
        .then(response => {
          //操作数组（剪切）splice（起始位置角标，删除数量，替换参数）两个参数的时候是删除，三个参数的时候是删除后将第三个参数放入被删除数组的位置
          //es6 findIndex() 查找索引获取位置角标
          // let index = category.item.findIndex(
          //   item => item.id == deleteId.value
          // );
          // console.log(index);
          // //删除数组指定元素
          // category.item.splice(index, 1);
          //方法二 filter过滤数组，形成新数组
          let newDate = category.item.filter(
            item => item.id !== deleteId.value
          );
          //旧数组替换成新数组
          category.item = newDate;
        })
        .catch(error => {});
    };
    //编辑
    const editCategory = params => {
      submit_button_type.value = params.type;
      category_children_input.value = false;
      category_first_disabled.value = false;
      submit_button_disabled.value = false;
      //一级名称输入还原 此处category_name是后端传过来的对象
      form.categoryName = params.data.category_name;
      //存储当前的数据对象
      category.current = params.data;
      console.log(category.current);
    };
    const editFirstCategory = () => {
      if (category.current.length === 0) {
        root.$message({
          type: "error",
          message: "请选择分类"
        });
        return false;
      }
      let requestdata = {
        id: category.current.id,
        categoryName: form.categoryName
      };
      EditCategory(requestdata)
        .then(response => {
          root.$message({
            type: "success",
            message: response.data.message
          });
          // let data = category.item.filter(
          //   item => item.id == category.current.id
          // );
          //注意此处data是一个数组，可以用控制台打印来判断
          // data[0].category_name = response.data.data.data.categoryName;
          //方法二
          category.current.category_name = response.data.data.data.categoryName;
          //清空输入框
          form.categoryName = "";
          //清除存储数据
          category.current = [];
        })
        .catch(error => {});
    };
    watch(
      () => categoryItem.item,
      value => {
        category.item = value;
      }
    );
    //dom挂载完成的时候执行
    onMounted(() => {
      getInfoCategory();
    });
    return {
      form,
      submit,
      addfirst,
      category_first_input,
      category_children_input,
      category,
      submit_button_loading,
      category_children_disabled,
      submit_button_disabled,
      category_first_disabled,
      deleteCategoryComfirm,
      editCategory,
      submit_button_type
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../../styles/config.scss";
.category-wrap {
  div:first-child {
    &::before {
      top: 20px;
    }
  }
  div:last-child {
    &::before {
      bottom: 21px;
    }
  }
}
.menu-title {
  line-height: 44px;
  padding-left: 22px;
  background-color: #f3f3f3;
}
.category {
  position: relative;
  line-height: 44px;
  cursor: pointer;
  &::before {
    content: "";
    position: absolute;
    left: 22px;
    top: 0px;
    bottom: 0px;
    width: 32px;
    border-left: 1px dotted #000;
  }
  h4 {
    padding-left: 40px;
  }
  svg {
    position: absolute;
    font-size: 17px;
    left: 14px;
    top: 13px;
    background: white;
  }
  li {
    position: relative;
    padding-left: 36px;
    margin-left: 24px;
    &::before {
      content: "";
      position: absolute;
      left: 0px;
      top: 22px;
      width: 32px;
      border-bottom: 1px dotted #000;
    }
  }
  li,
  h4 {
    @include webkit(transition, all 0.5s ease 0s);
    &:hover {
      background-color: #f3f3f3;
      .button-group {
        display: block;
      }
    }
  }
}
.button-group {
  display: none;
  position: absolute;
  top: 0px;
  z-index: 2;
  right: 11px;
  button {
    font-size: 12px;
  }
}
.form-wrap {
  width: 410px;
  padding-top: 26px;
}
.hr-e9e9e9 {
  width: calc(100% + 60px);
  border: none;
  margin: 30px 0px 30px -30px;
  border-bottom: 1px solid #e9e9e9;
}
</style>
