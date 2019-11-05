<template>
  <div id="nav-wrap">
    菜单
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#nav-wrap {
  //固定的
  position: fixed;
  left: 0px;
  top: 0px;
  width: $navMenu;
  height: 100vh;
  background-color: rgb(0, 67, 105);
}
</style>
