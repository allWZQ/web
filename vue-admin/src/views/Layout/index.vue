<template>
  <div id="layout" :class="[menuState ? 'close' : 'open']">
    <LayoutHeader />
    <LayoutMain />
    <LayoutNav />
  </div>
</template>
<script>
import { computed } from "@vue/composition-api";
import LayoutHeader from "./Components/Header";
import LayoutMain from "./Components/Main";
import LayoutNav from "./Components/Nav";
export default {
  name: "layout",
  components: { LayoutHeader, LayoutMain, LayoutNav },
  setup(props, { root }) {
    const menuState = computed(() => root.$store.state.app.isCollapse);
    return {
      menuState
    };
  }
};
</script>
<style lang="scss" scoped></style>
