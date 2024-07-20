<template>
  <div class="layout">
    <Header>重症数字孪生大屏</Header>
    <div class="layout-content">
      <div class="layout-content-left">
        <ProjectDetailChart name="关注项目详情" />
      </div>
      <div class="layout-content-right">
        <BuildingDetailChart />
        <!-- <Panel>
          <LineCharts></LineCharts>
        </Panel> -->
      </div>
      <Sence></Sence>
      <div class="layout-content-bottom">
        <LegendGroup />
        <div class="flex-wrapper">
          <Analysis1 />
          <Analysis2 />
          <Analysis3 />
          <Analysis4 />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Layout">
import Header from "@/layout/components/Header.vue";
import ProjectDetailChart from "./components/project-detail.vue";
import BuildingDetailChart from "./components/building-detail.vue";
import Sence from "@/components/Sence.vue";
import LegendGroup from "./components/legend-group.vue";
import Analysis1 from "./components/analysis-1.vue";
import Analysis2 from "./components/analysis-2.vue";
import Analysis3 from "./components/analysis-3.vue";
import Analysis4 from "./components/analysis-4.vue";
</script>

<style scope>
.layout {
  width: 100vw;
  height: 100vh;
  background-color: radial-gradient(52% 62% at 50% 50%, #1a1a1a 0%, #050407 100%);
  background-image: url("@/assets/images/home-bg.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-blend-mode: screen;
  color: #fff;
}
.layout-content {
  width: 100vw;
  height: 100vh;
}
.layout-content-left {
  position: absolute;
  left: 0.5rem;
  top: 1rem;
  /* width: 30vw; */
}
.layout-content-right {
  position: absolute;
  right: 0.63rem;
  top: 0.28rem;
  width: 2.59rem;
}
.layout-content-bottom {
  position: absolute;
  bottom: 0.4rem;
  left: 50%;
  transform: translateX(-50%);
}
.flex-wrapper {
  display: flex;
}
.panel {
  margin-bottom: 0.3rem;
}
</style>
