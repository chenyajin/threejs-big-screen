<template>
  <div class="layout">
    <Header>重症数字孪生大屏</Header>
    <div class="layout-content">
      <div class="layout-content-left">
        <ProjectDetailChart name="关注项目详情" />
      </div>
      <!-- <div class="layout-content-right">
        <Panel>
          <LineCharts></LineCharts>
        </Panel>
      </div> -->
      <Sence></Sence>
    </div>
  </div>
</template>

<script setup lang="ts" name="Layout">
import Header from "@/layout/components/Header.vue";
import ProjectDetailChart from "./components/project-detail.vue";
import Sence from "@/components/Sence.vue";
import Panel from "@/components/Panel/index.vue";
import LineCharts from "@/components/Charts/LineChart.vue";
import PieChart from "@/components/Charts/PieChart.vue";
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
  left: 0.6rem;
  top: 70px;
  /* width: 30vw; */
}
.layout-content-right {
  position: absolute;
  right: 0.6rem;
  top: 70px;
  width: 30vw;
}
.panel {
  margin-bottom: 0.3rem;
}
</style>
