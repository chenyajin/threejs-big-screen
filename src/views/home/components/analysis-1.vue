<template>
  <div class="analysis-1">
    <div class="row-title">
      <svg-icon icon-class="analysis-1" class="analysis-icon" />
      <span>指标统计</span>
    </div>
    <div class="table-header common-row">
      <span v-for="(item, index) in tableName" :key="item" :class="['item-' + index, 'share-item']">{{ item }}</span>
    </div>
    <div class="content-row common-row">
      <div v-for="(col, index) in tableData" :key="index" :class="['item-' + index, 'share-item']">
        <span class="item-content">{{ col.content }}</span>
        <span class="item-unit">{{ col.unit }}</span>
      </div>
    </div>
  </div>
</template>

<script setup name="Analysis1">
const tableName = ["收治患者数", "床位占床率", "床位使用效益", "设备使用效益", "设备实时效益"];
const tableData = reactive([
  {
    content: "32",
    unit: "人"
  },
  {
    content: "92",
    unit: "%"
  },
  {
    content: "86",
    unit: "%"
  },
  {
    content: "96",
    unit: "%"
  },
  {
    content: "4",
    unit: "%"
  }
]);
</script>

<style lang="scss" scoped>
.analysis-1 {
  background: rgba(247, 248, 255, 0.08);
  backdrop-filter: blur(8px);
  border-radius: 12px;
  height: 1.8rem;
  width: 6rem;
}
.row-title {
  padding: 0.2rem 0 0.28rem 0.2rem;
  color: #77d1fa;
  font-size: 0.2rem;
  text-align: left;
  letter-spacing: 0.05em;
  .analysis-icon {
    margin-right: 0.08rem;
  }
}
.common-row {
  display: flex;
  margin-left: 0.36rem;
  margin-bottom: 0.12rem;
}
.table-header {
  font-size: 0.16rem;
  color: #fff;
  opacity: 0.6;
}
.content-row {
  font-size: 0.28rem;
  font-weight: bold;
  .item-unit {
    font-size: 0.16rem;
    opacity: 0.8;
    margin-left: 0.01rem;
    font-weight: normal;
  }
}
.share-item {
  text-align: left;
  width: 20%;
}
</style>
