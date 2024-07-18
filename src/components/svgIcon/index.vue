<!--
 * @Author: 陈亚金
 * @Date: 2024-07-18 13:13:01
 * @LastEditors: 陈亚金
 * @LastEditTime: 2024-07-18 13:59:37
 * @Description: 
-->
<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :href="iconName" />
  </svg>
</template>

<script setup>
// defineOptions({
//   name: "SvgIcon"
// });
const props = defineProps({
  iconClass: {
    type: String,
    required: true
  },
  className: {
    type: String,
    default: ""
  }
});
const iconName = computed(() => {
  return `#icon-${props.iconClass}`;
});
const svgClass = computed(() => {
  if (props.className) {
    return "svg-icon " + props.className;
  } else {
    return "svg-icon";
  }
});
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
