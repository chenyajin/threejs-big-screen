<template>
  <el-scrollbar>
    <section class="app-main">
      <router-view />
      <!-- <router-view v-slot="{ Component }">
        <keep-alive :include="cachedViews">
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </router-view> -->
    </section>
  </el-scrollbar>
</template>
<script setup>
// defineOptions({
//   name: "AppMain"
// });
</script>
