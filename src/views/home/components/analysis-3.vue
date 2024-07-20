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
import { deviceAlarmStatus } from "@/mock/deviceAlarm";

const tableName = reactive([
  {
    id: 1,
    name: "Sp02 传感器脱落",
    color: "#2386DE",
    data: 30,
    radio: "54%"
  },
  {
    id: 2,
    name: "关机",
    color: "#16B37C",
    data: 11,
    radio: "20%"
  },
  {
    id: 3,
    name: "屏幕损坏",
    color: "#FC8C44",
    data: 7,
    radio: "12.7%"
  },
  {
    id: 4,
    name: "屏幕损坏",
    color: "#FC8C44",
    data: 5,
    radio: "9.1%"
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
            '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' +
              params.color +
              '"></span>',
            '<span style="display:inline-block;margin-left:0.02rem;margin-right:0.2rem;font-size: 0.14rem;">' +
              params.name +
              "</span>",
            '<span style="font-size: 0.14rem;">' + params.value + "</span>",
            "%"
          ].join("");
        }
      },
      color: ["#2386DE", "#16B37C", "#FC8C44", "#FC8C44"],
      data: [
        { value: 54, name: "关机" },
        { value: 20, name: "屏幕损坏" },
        { value: 12.7, name: "脱落" },
        { value: 9.1, name: "脱落" }
      ]
    }
  ]
};
const analysis3Pie = ref(null);
const { setOptions } = useChart(analysis3Pie);
onMounted(() => {
  getData();
  setOptions(option);
});

const getData = () => {
  const devices = deviceAlarmStatus.biz_device_alarm;
  devices.forEach((item, index) => {
    tableName[index].name = item["alarm_name"];
    option.series[0].data[index].name = item["alarm_name"];
  });
};
</script>

<style lang="scss" scoped>
.analysis-3 {
  background: rgba(247, 248, 255, 0.08);
  backdrop-filter: blur(8px);
  border-radius: 12px;
  height: 1.8rem;
  width: 4.72rem;
  display: flex;
  margin-left: 0.24rem;
}
.title-block {
  padding: 0.2rem 0 0.08rem 0.2rem;
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
    justify-content: space-between;
    margin-left: 0.48rem;
    margin-bottom: 0.07rem;
  }
  .col-item-name {
    display: inline-block;
    width: 1.3rem;
    margin: 0 0.06rem;
    color: #82badc;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .col-item-data {
    display: inline-block;
    text-align: left;
    width: 0.3rem;
  }
  .col-item-radio {
    display: inline-block;
    width: 0.65rem;
    text-align: left;
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
