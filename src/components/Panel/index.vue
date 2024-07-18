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
  height: 0.5rem;
  margin-top: 0.2rem;
  margin-bottom: 0.25rem;
  font-size: 0.25rem;
  font-weight: bold;
  text-align: left;

  /* font-size: 20px; */
  font-weight: 500;
  line-height: 32px;
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
