<template>
  <div class="analysis-3">
    <div class="left-col">
      <div class="title-block">
        <svg-icon icon-class="analysis-3" class="analysis-icon" />
        <span>设备报警统计</span>
      </div>
      <div class="content-block">
        <div v-for="item in tableName" :key="item.id" class="row-content">
          <span class="block-small" :style="{ backgroundColor: item.color }"></span>
          <span class="col-item-name">{{ item.name }}</span>
          <span class="col-item-data">{{ item.data }}</span>
          <span class="col-item-radio">{{ item.radio }}</span>
        </div>
      </div>
    </div>
    <div class="right-col">
      <div ref="analysis3Pie" class="chart-block"></div>
      <div class="inner-text absolute-block">
        <div class="circle-block absolute-block"></div>
        <span class="big-text"> 512 </span>
        <span class="small-text">预警总览</span>
      </div>
    </div>
  </div>
</template>

<script setup name="Analysis3">
import { useChart } from "@/hooks/useChart";

const tableName = reactive([
  {
    id: 1,
    name: "脱落",
    data: 397,
    color: "#2386DE",
    radio: "50%"
  },
  {
    id: 2,
    name: "关机",
    data: 291,
    color: "#16B37C",
    radio: "33.3%"
  },
  {
    id: 3,
    name: "屏幕损坏",
    data: 119,
    color: "#FC8C44",
    radio: "16.7%"
  }
]);
const option = {
  tooltip: {
    trigger: "item"
  },
  series: [
    {
      type: "pie",
      radius: ["50%", "80%"],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: "center"
      },
      emphasis: {
        label: {
          show: false
        }
      },
      labelLine: {
        show: false
      },
      color: ["#2386DE", "#16B37C", "#FC8C44"],
      data: [
        { value: 180, name: "脱落" },
        { value: 2, name: "关机" },
        { value: 12, name: "屏幕损坏" }
      ]
    }
  ]
};
const analysis3Pie = ref(null);
const { setOptions } = useChart(analysis3Pie);
onMounted(() => {
  setOptions(option);
});
</script>

<style lang="scss" scoped>
.analysis-3 {
  background: rgba(247, 248, 255, 0.08);
  backdrop-filter: blur(8px);
  border-radius: 12px;
  height: 1.8rem;
  width: 4.56rem;
  display: flex;
  margin-left: 0.24rem;
}
.title-block {
  padding: 0.22rem 0 0.25rem 0.2rem;
  color: #77d1fa;
  font-size: 0.2rem;
  text-align: left;
  letter-spacing: 0.05em;
  .analysis-icon {
    margin-right: 0.08rem;
  }
}
.content-block {
  font-size: 0.16rem;
  text-align: left;
  .row-content {
    display: flex;
    align-items: center;
    margin-left: 0.48rem;
    margin-bottom: 0.05rem;
  }
  .col-item-name {
    display: inline-block;
    width: 0.7rem;
    margin: 0 0.06rem;
    color: #82badc;
  }
  .col-item-radio {
    display: inline-block;
    width: 0.65rem;
    text-align: right;
  }
}
.block-small {
  display: inline-block;
  width: 0.16rem;
  height: 0.08rem;
  border-radius: 0.02rem;
}
.right-col {
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 0.18rem;
  .absolute-block {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .inner-text {
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
  }
  .circle-block {
    background: #203f5c;
    width: 1.3rem;
    height: 1.3rem;
    opacity: 0.6;
    border-radius: 50%;
  }
  .big-text {
    font-size: 0.28rem;
    font-weight: bold;
    z-index: 1;
  }
  .small-text {
    font-size: 0.14rem;
    color: #82badc;
    opacity: 0.8;
    z-index: 1;
  }
}
.chart-block {
  width: 1.8rem;
  height: 1.8rem;
}
</style>
