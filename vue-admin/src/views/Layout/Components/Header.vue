<template>
  <div id="header-wrap">
    标题
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#header-wrap {
  position: fixed;
  top: 0px;
  right: 0px;
  left: $navMenu;
  height: 75px;
  background-color: rgb(255, 255, 255);
  //阴影x，y轴的长度 ,大小，扩展， 颜色以及透明度
  -webkit-box-shadow: 0px 3px 16px 0px rgba(0, 0, 0, 0.1);
}
</style>
