<template>
  <Panel :title="name">
    <!-- <template #title>
      <div class="panel-title">{{ name }}</div>
    </template> -->
    <div class="panel-wrapper">
      <div class="header-row">
        <span v-for="(item, index) in tableName" :key="item" :class="['item-' + index, 'share-item']">{{ item }}</span>
      </div>
      <div v-for="(col, index) in tableData" :key="col.project" class="content-row">
        <span class="item-0 share-item">
          <label class="square-index">{{ index }}</label>
        </span>
        <span class="item-1 share-item">{{ col.project }}</span>
        <span class="item-2 share-item">{{ col.today }}</span>
        <span class="item-3 share-item">{{ col.yesterday }}</span>
        <span class="item-4 share-item">{{ col.month }}</span>
      </div>
    </div>
  </Panel>
</template>

<script setup name="ProjectDetailChart">
import Panel from "@/components/Panel/index.vue";
import { reactive } from "vue";

defineProps({
  name: {
    type: String,
    default: "11"
  }
});
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
    project: "其它",
    today: 0,
    yesterday: 0,
    month: 0
  }
]);
</script>

<style lang="scss" scoped>
.panel-wrapper {
  // padding: 0.2rem;
  font-size: 14px;
}
.header-row {
  color: #abdfff;
}
.content-row {
  color: #fff;
}
.share-item {
  display: inline-block;
  text-align: left;
  font-weight: normal;
  height: 0.55rem;
  line-height: 0.55rem;
}
.square-index {
  display: inline-block;
  width: 0.3rem;
  height: 0.3rem;
  line-height: 0.3rem;
  text-align: center;
  background: linear-gradient(135deg, rgba(24, 94, 158, 0.6) 0%, rgba(24, 94, 158, 0) 99%);
  border: 1px solid rgba(31, 135, 204, 0.2);
}
.item-0 {
  width: 0.6rem;
  padding-left: 0.1rem;
}
.item-1 {
  width: 1.4rem;
}
.item-2 {
  width: 0.6rem;
}
.item-3 {
  width: 0.6rem;
}
.item-4 {
  width: 0.5rem;
}
</style>
