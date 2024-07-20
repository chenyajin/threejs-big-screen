<template>
  <div class="legend-wrapper">
    <div class="bed-icon-group">
      <span v-for="item in bedLegends" :key="item.id">
        <svg-icon :icon-class="item.icon" class="legend-icon" />
        <span class="bed-name">{{ item.name }}</span>
      </span>
    </div>
    <span>
      <span v-for="legend in legends" :key="legend.id" class="group-item">
        <svg-icon :icon-class="legend.icon" class="legend-icon" />
        <span class="legend-name">{{ legend.name }}</span>
      </span>
    </span>
  </div>
</template>

<script setup name="LegendGroup">
const bedLegends = [
  {
    id: 11,
    name: "+01床",
    icon: "bed-icon"
  },
  {
    id: 12,
    name: "+02床",
    icon: "bed-icon"
  },
  {
    id: 12,
    name: "+03床",
    icon: "bed-icon"
  }
];
const legends = [
  {
    id: 1,
    name: "监护仪",
    icon: "jianhuyi"
  },
  {
    id: 1,
    name: "呼吸机",
    icon: "huxiji"
  },
  {
    id: 1,
    name: "输液泵",
    icon: "shuyebeng"
  },
  {
    id: 1,
    name: "CRRT",
    icon: "crrt"
  },
  {
    id: 1,
    name: "ECMO",
    icon: "ecmo"
  }
];
</script>

<style lang="scss" scoped>
.legend-wrapper {
  font-size: 0.2rem;
  margin-bottom: 0.36rem;
  cursor: pointer;
  .group-item {
    opacity: 0.5;
    &:first-child {
      opacity: 1;
    }
  }
  .legend-icon {
    width: 0.25rem;
    height: 0.25rem;
  }
  .legend-name {
    margin-left: 0.08rem;
    margin-right: 0.28rem;
  }
}
.bed-icon-group {
  font-size: 0.16rem;
  margin-bottom: 0.2rem;
  .bed-name {
    margin-left: 0.1rem;
    margin-right: 0.19rem;
  }
}
</style>
