<template>
  <Panel>
    <div>向西28° 2023/04/02 12:00 正常</div>
    <div>向西28° 2023/04/02 12:00 正常</div>
    <div>向西28° 2023/04/02 12:00 正常</div>
  </Panel>
</template>

<script setup name="ProjectDetailChart">
import Panel from "@/components/Panel/index.vue";
import { reactive } from "vue";

const tableName = ["序号", "项目", "今日", "昨日", "当月"];
const tableData = reactive([
  {
    project: "隔壁病床",
    today: 0,
    yesterday: 0,
    month: 0
  },
  {
    project: "脓毒症",
    today: 0,
    yesterday: 0,
    month: 0
  },
  {
    project: "CRRT",
    today: 0,
    yesterday: 0,
    month: 0
  },
  {
    project: "PICCO",
    today: 0,
    yesterday: 0,
    month: 0
  },
  {
    project: "PICCO",
    today: 0,
    yesterday: 0,
    month: 0
  }
]);
</script>

<style lang="scss" scoped></style>
