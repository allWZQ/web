<template>
  <div id="main-wrap">
    <div class="main-content">
      <div class="content">
        <router-view />
      </div>
    </div>
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
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.content {
  width: 100%;
  height: 100%;
  padding: 30px 30px 0px 30;
  padding-top: 30px;
  padding-left: 30px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background-color: #fff;
}
</style>
