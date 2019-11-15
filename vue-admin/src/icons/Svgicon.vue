<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconname"></use>
  </svg>
</template>
<script>
import { reactive, ref, onMounted, computed } from "@vue/composition-api";
export default {
  name: "Svgicon",
  //不限制数据类型
  //props: ["iconClass", "className"],
  //限制数据类型
  props: {
    iconClass: {
      type: String, //定义接收的值类型
      default: "", //默认值
      required: true //必填项
    },
    className: {
      type: String,
      default: "",
      required: true
    }
  },
  setup(props) {
    //计算属性、得出最终结果，并返回
    const iconname = computed(() => `#icon-${props.iconClass}`);
    const svgClass = computed(() => {
      if (props.className) {
        return `svg-icon ${props.className}`;
      } else {
        return `svg-icon`;
      }
    });

    return {
      iconname,
      svgClass
    };
  }
};
</script>
<style lang="scss" scoped>
.svg-icon {
  width: 22px;
  height: 22px;
  fill: currentColor;
}
</style>
