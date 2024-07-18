<template>
  <div class="but-wrapper" @click="onClick">
    <span>{{ name }}</span>
  </div>
</template>

<script setup name="CuButton">
defineProps({
  name: {
    type: String,
    default: "按钮"
  }
});
const emits = defineEmits(["click"]);
const onClick = () => {
  emits("click");
};
</script>

<style lang="scss" scoped>
.but-wrapper {
  width: 100px;
  background-image: url("@/assets/images/button-bg.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  color: #fff;
  font-weight: bold;
  font-size: 14px;
  padding: 0.05rem;
  cursor: pointer;
}
</style>
