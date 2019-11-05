<template>
  <div id="main-wrap">
    <router-view />
    内容
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#main-wrap {
  position: fixed;
  left: $navMenu;
  top: 75px;
  right: 0px;
  bottom: 0px;
  border: 30px solid #f7f7f7;
  border-bottom: none;
  -webkit-box-sizing: border;
}
</style>
