<template>
  <div class="analysis-4">
    <div class="row-title">
      <svg-icon icon-class="analysis-4" class="analysis-icon" />
      <span>可调度资源</span>
    </div>
    <div class="content-wrapper">
      <div class="title-row">
        <span>床位</span>
        <span>14/56</span>
      </div>
      <div class="progress progress-bed"></div>
      <div class="title-row">
        <span>设备</span>
        <span>23/120</span>
      </div>
      <div class="progress progress-device"></div>
    </div>
  </div>
</template>

<script setup name="Analysis4"></script>

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
  padding: 0.22rem 0 0.22rem 0.2rem;
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
}
.progress {
  width: 2rem;
  height: 0.06rem;
  background-color: rgba(31, 135, 204, 0.2);
}
.progress-bed {
}
.progress-device {
}
</style>
