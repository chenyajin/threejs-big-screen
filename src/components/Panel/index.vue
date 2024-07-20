<template>
  <div class="panel">
    <div v-if="title" class="panel-title">{{ title }}</div>
    <div class="panel-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts" name="Panel">
defineProps({
  title: {
    type: String,
    default: ""
  }
});
</script>

<style scoped>
.panel {
  z-index: 2;
}
.panel-title {
  margin-top: 0.07rem;
  margin-bottom: 0.2rem;
  font-size: 0.2rem;
  text-align: left;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: #77d1fa;
}
.panel-content {
  font-size: 0.2rem;
  box-sizing: border-box;
  border: 0.01rem dashed rgba(255, 255, 255, 0.2);

  z-index: 4;
}
</style>
