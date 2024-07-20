<template>
  <div
    class="popover"
    :style="{
      top: props.top + 'px',
      left: props.left + 'px',
      display: isShow ? 'inline-block' : 'none'
    }"
  >
    <div class="card-wrapper">
      <!-- <img src="@/assets/images/room-card" class="card-size" /> -->
      <!-- <svg-icon icon-class="room-card" class="card-size" /> -->
      <div class="content-wrapper">
        <div class="row-height">
          <span>房间{{ dataRef["dic_room_id"] }}</span>
          <span class="patient-num">1人</span>
          <svg-icon icon-class="jianhuyi" />
        </div>
        <div class="row-height">
          <span>{{ dataRef["dic_bed_id"] }}床</span>
          <span class="patient-name">{{ dataRef["patinet_name"] }}</span>
          <span>{{ dataRef["enum_sex"] }}</span>
        </div>
      </div>
    </div>
    <!-- <div class="popover-title">
      {{ dataRef.name }}
    </div>
    <div class="popover-content">
      {{ "content" }}
    </div> -->
  </div>
</template>

<script lang="ts" setup name="Popover">
import { ref } from "vue";
type PropsTypes = {
  top: number;
  left: number;
};

const props = withDefaults(defineProps<PropsTypes>(), {
  top: 0,
  left: 0
});

const isShow = ref(false);
const dataRef = ref<any>({});

const setShow = (visible: boolean, data?: any) => {
  isShow.value = visible;
  if (data) dataRef.value = data;
};

defineExpose({
  setShow
});
</script>

<style lang="scss" scoped>
.popover {
  position: absolute;
  font-size: 0.2rem;
}
.card-wrapper {
  position: relative;
  background-image: url("@/assets/images/room-card.png");
  background-repeat: no-repeat;
  background-position: top;
  background-size: cover;
  width: 1.88rem;
  height: 0.96rem;
  .content-wrapper {
    padding: 0.12rem;
    text-align: left;
    border-bottom: 1px solid #54aadb;
  }
  .row-height {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 0.36rem;
    padding-right: 0.2rem;
  }
  .patient-num {
    margin: 0 0.1rem;
  }
  &::after {
    content: "";
    position: absolute;
    left: 0.01rem;
    top: 0.96rem;
    border-left: 1px solid #54aadb;
    width: 0.001rem;
    background: #54aadb;
    height: 1.1rem;
  }
}
</style>
