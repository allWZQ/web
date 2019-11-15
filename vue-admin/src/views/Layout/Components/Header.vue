<template>
  <div id="header-wrap">
    <div class="pull-left header-icon" @click="navMenuState">
      <svg-icon iconClass="menuH" className="menuH" />
    </div>
    <div class="pull-right">
      <div class="user-info pull-left">管理员</div>
      <div class="header-icon pull-left">
        <svg-icon iconClass="zx" className="zx" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "layoutHeader",
  setup(props, { root }) {
    const navMenuState = () => {
      root.$store.commit("SET_COLLAPSE");
    };
    return {
      navMenuState
    };
  }
};
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
  line-height: 75px;
}
.header-icon {
  padding: 0 32px;
  svg {
    margin-bottom: -8px;
    width: 35px;
    height: 35px;
    //将鼠标的指针改成手势
    cursor: pointer;
  }
}
.user-info {
  height: 100%;
  padding: 0 32px;
  border-right: 1px solid #ededed;
  + .header-icon {
    padding: 0 28px;
  }
}
</style>
