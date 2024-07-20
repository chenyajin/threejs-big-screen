<template>
  <div class="analysis-4">
    <div class="row-title">
      <svg-icon icon-class="analysis-4" class="analysis-icon" />
      <span>可调度资源</span>
    </div>
    <div class="content-wrapper">
      <div class="title-row">
        <span>床位</span>
        <span>{{ data.bed.use }}/{{ data.bed.total }}</span>
      </div>
      <div class="progress progress-bed">
        <div class="inner-progress"></div>
      </div>
      <div class="title-row">
        <span>设备</span>
        <span>{{ data.device.use }}/{{ data.device.total }}</span>
      </div>
      <div class="progress progress-device">
        <div class="inner-progress"></div>
      </div>
    </div>
  </div>
</template>

<script setup name="Analysis4">
const data = ref({
  bed: {
    use: 14,
    total: 56
  },
  device: {
    use: 23,
    total: 120
  }
});
const bedRadio = ref("0%");
const deviceRadio = ref("0%");
onMounted(() => {
  bedRadio.value = ((data.value.bed.use / data.value.bed.total).toFixed(2) * 100).toString() + "%";
  deviceRadio.value = ((data.value.device.use / data.value.device.total).toFixed(2) * 100).toString() + "%";
});
</script>

<style lang="scss" scoped>
.analysis-4 {
  background: rgba(247, 248, 255, 0.08);
  backdrop-filter: blur(8px);
  border-radius: 12px;
  height: 1.8rem;
  margin-left: 0.24rem;
  width: 2.72rem;
  font-size: 0.16rem;
}
.row-title {
  padding: 0.2rem 0 0.2rem 0.2rem;
  color: #77d1fa;
  font-size: 0.2rem;
  text-align: left;
  letter-spacing: 0.05em;
  .analysis-icon {
    margin-right: 0.08rem;
  }
}
.content-wrapper {
  text-align: left;
  margin-left: 0.48rem;
  .title-row {
    display: flex;
    justify-content: space-between;
    width: 2rem;
    margin-bottom: 0.06rem;
  }
}
.progress {
  position: relative;
  margin-bottom: 0.1rem;
  width: 2rem;
  height: 0.06rem;
  background-color: rgba(31, 135, 204, 0.2);
}
.inner-progress {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0.06rem;
  animation-duration: 0.5s;
}
.progress-bed {
  .inner-progress {
    background: linear-gradient(270deg, #4fe8c0 2%, #23a381 97%);
    animation-name: expandWidthBed;
    width: v-bind(bedRadio);
  }
}
.progress-device {
  .inner-progress {
    background: linear-gradient(270deg, #41e3ff 2%, #1b72ad 97%);
    animation-name: expandWidthDevice;
    width: v-bind(deviceRadio);
  }
}
@keyframes expandWidthBed {
  from {
    width: 0;
  }
  to {
    width: v-bind(bedRadio);
  }
}
@keyframes expandWidthDevice {
  from {
    width: 0;
  }
  to {
    width: v-bind(deviceRadio);
  }
}
</style>
