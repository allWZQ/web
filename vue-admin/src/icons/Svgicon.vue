<template>
  <div>{{ msg }}</div>
</template>
<script>
import { reactive, ref, onMounted, isRef, toRefs } from "@vue/composition-api";
export default {
  name: "Svgicon",
  setup() {
    const msg = ref("派大星");
    return {
      msg
    };
  }
};
</script>
<style lang="scss" scoped></style>
