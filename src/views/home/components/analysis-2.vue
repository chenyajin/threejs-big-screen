<template>
  <div class="analysis-2">
    <div class="left-col">
      <div class="title-block">
        <svg-icon icon-class="analysis-2" class="analysis-icon" />
        <span>设备使用统计</span>
      </div>
      <div class="content-block">
        <div v-for="item in tableName" :key="item.id" class="row-content">
          <span class="block-small" :style="{ backgroundColor: item.color }"></span>
          <span class="col-item">{{ item.name }}</span>
          <span>{{ item.data }}</span>
        </div>
      </div>
    </div>
    <div class="right-col">
      <div ref="analysis2Pie" class="chart-block"></div>
      <div class="inner-text absolute-block">
        <div class="circle-block absolute-block"></div>
        <span class="big-text"> 90% </span>
        <span class="small-text">运行稳定</span>
      </div>
    </div>
  </div>
</template>

<script setup name="Analysis2">
import { useChart } from "@/hooks/useChart";

const tableName = reactive([
  {
    id: 1,
    name: "运行稳定",
    data: 180,
    color: "#2386DE"
  },
  {
    id: 2,
    name: "异常警报",
    data: 2,
    color: "#E2BC52"
  },
  {
    id: 3,
    name: "设备故障",
    data: 12,
    color: "#FC8C44"
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
      tooltip: {
        trigger: "item",
        formatter: function (params) {
          return [
            '<span style="background-color: rgba(247, 248, 255, 0.08)"><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' +
              params.color +
              '"></span>',
            '<span style="display:inline-block;margin-left:0.02rem;margin-right:0.2rem;font-size: 0.14rem;">' +
              params.name +
              "</span>",
            '<span style="font-size: 0.14rem;">' + params.value + "</span></span>"
          ].join("");
        }
      },
      color: ["#2386DE", "#E2BC52", "#FC8C44"],
      data: [
        { value: 180, name: "运行稳定" },
        { value: 2, name: "异常警报" },
        { value: 12, name: "设备故障" }
      ]
    }
  ]
};
const analysis2Pie = ref(null);
const { setOptions } = useChart(analysis2Pie);
onMounted(() => {
  setOptions(option);
});
</script>

<style lang="scss" scoped>
.analysis-2 {
  background: rgba(247, 248, 255, 0.08);
  backdrop-filter: blur(8px);
  border-radius: 12px;
  height: 1.8rem;
  width: 3.96rem;
  display: flex;
  margin-left: 0.24rem;
}
.title-block {
  padding: 0.2rem 0 0.2rem 0.2rem;
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
    margin-bottom: 0.11rem;
  }
  .col-item {
    margin: 0 0.06rem;
    color: #82badc;
  }
}
.block-small {
  display: inline-block;
  width: 0.16rem;
  height: 0.08rem;
  border-radius: 0.02rem;
}
.left-col {
  flex: 1;
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
