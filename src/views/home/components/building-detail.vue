<template>
  <div class="wrapper">
    <div class="select-wrapper">
      <SelectGroup />
    </div>
    <div class="building-wrapper">
      <div class="building-name">#9栋</div>
      <svg-icon icon-class="building-check" class="inner-building" />
    </div>
    <div class="floor-wrapper">
      <div class="col-1 flex-col">
        <span class="title-name">床号</span>
        <span class="normal-size">10#</span>
      </div>
      <div class="col-2 icons-group">
        <svg-icon icon-class="roll-line" class="roll-line" />
        <svg-icon icon-class="arrow-line" class="arrow-line" />
        <svg-icon icon-class="floor-bg" class="position-but" />
        <div class="col-3 flex-col">
          <span class="title-name">楼层</span>
          <span class="show-position normal-size"> 6F </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="BuildingDetailChart">
import SelectGroup from "./select-group.vue";
</script>

<style lang="scss" scoped>
.normal-size {
  font-size: 0.18rem;
}
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.building-wrapper {
  .building-name {
    font-weight: 300;
    margin-bottom: 0.21rem;
    font-size: 0.18rem;
    color: #abdfff;
  }
  .inner-building {
    width: 2.59rem;
    height: 1.37rem;
  }
}
.floor-wrapper {
  display: flex;
  width: 2.59rem;
  margin-top: 0.4rem;
  .title-name {
    font-size: 0.18rem;
    color: #abdfff;
    margin-top: -0.18rem;
    margin-bottom: 0.2rem;
  }
}
.icons-group {
  position: relative;
  display: flex;
  align-items: center;
  .roll-line {
    height: 0.66rem;
    width: 0.24rem;
    transform: translateX(60%);
    padding-bottom: 0.2rem;
  }
  .arrow-line {
    width: 0.41rem;
    height: 0.06rem;
  }
  .position-but {
    width: 1.2rem;
    height: 0.4rem;
  }
}
.col-3 {
  position: absolute;
  top: 0;
  right: 0.4rem;
}
.flex-col {
  display: flex;
  flex-direction: column;
}
</style>
