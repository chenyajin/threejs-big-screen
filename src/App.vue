<template>
  <el-config-provider :size="elConfig.size" :z-index="elConfig.zIndex">
    <router-view />
  </el-config-provider>
</template>

<script setup>
const elConfig = ref({
  size: "default",
  zIndex: 300
});
</script>
<style>
body,
html {
  background-color: #000;
}
body {
  overflow: hidden;
}
#app {
  font-family: SourceHanSans-Regular;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 10px; */
  /* box-sizing: border-box; */
  /* width: 100%; */
}
</style>
