<template>
  <div id="nav-wrap">
    <h1 class="logo"><img src="../../../assets/logo.png" alt="" /></h1>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      background-color="transparent"
      text-color="#fff"
      active-text-color="#fff"
      router
    >
      <template v-for="(item, index) in routers">
        <el-submenu v-if="!item.hidden" :key="item.id" :index="index + ''">
          <!-- 一级菜单 -->
          <template slot="title">
            <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon" />
            <span slot="title">{{ item.meta.name }}</span>
          </template>
          <!-- 子级菜单 -->
          <el-menu-item
            v-for="subItem in item.children"
            :key="subItem.id"
            :index="subItem.path"
          >
            {{ subItem.meta.name }}</el-menu-item
          >
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>
<script>
import {
  reactive,
  ref,
  onMounted,
  isRef,
  toRefs,
  computed
} from "@vue/composition-api";
export default {
  name: "navMenu",
  setup(props, { root }) {
    //data数组 数据
    const routers = reactive(root.$router.options.routes);
    //computed 监听
    const isCollapse = computed(() => root.$store.state.app.isCollapse);
    console.log(routers);
    return {
      isCollapse,
      routers
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
.logo {
  text-align: center;
  img {
    margin: 28px auto 25px;
    width: 92px;
    @include webkit(transition, all 0.3s ease 0s);
  }
}
#nav-wrap {
  //固定的
  position: fixed;
  left: 0px;
  top: 0px;
  height: 100vh;
  background-color: rgb(0, 67, 105);
  //动画缓冲，美化过度
  @include webkit(transition, all 0.3s ease 0s);
  svg {
    margin-right: 10px;
  }
}
.open {
  #nav-wrap {
    width: $navMenu;
  }
}
.close {
  #nav-wrap {
    width: $navMenuMin;
  }
  .logo img {
    width: 50px;
  }
}
</style>
