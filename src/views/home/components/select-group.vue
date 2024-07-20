<template>
  <div class="flex-wrapper">
    <el-dropdown
      placement="bottom-start"
      :popper-options="{
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 0]
            }
          }
        ]
      }"
      popper-class="global-dropdown-popover"
    >
      <span class="select-status el-dropdown-link">
        <span class="select-text">徐汇院区</span>
        <el-icon class="el-icon--right icon-right" color="#ABDFFF"><CaretBottom /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu class="menu-wrapper">
          <el-dropdown-item v-for="area in areaList" :key="area.code">{{ area.name }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <span class="block-line"></span>
    <el-dropdown
      placement="bottom-start"
      :popper-options="{
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 0]
            }
          }
        ]
      }"
      popper-class="global-dropdown-popover"
    >
      <span class="select-status el-dropdown-link">
        <span class="select-text">重症医学科</span>
        <el-icon class="el-icon--right icon-right" color="#ABDFFF"><CaretBottom /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu class="menu-wrapper">
          <el-dropdown-item v-for="area in depList" :key="area.code">{{ area.name }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup name="SelectGroup">
import { CaretBottom } from "@element-plus/icons-vue";

const areaList = reactive([
  {
    name: "徐汇院区",
    code: "11"
  }
]);
const depList = reactive([
  {
    name: "重症医学科",
    code: "21"
  }
]);
</script>

<style lang="scss" scoped>
:deep(.menu-popover) {
  border: none;
}
.flex-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  margin-bottom: 0.35rem;
}
.select-status {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #abdfff;
  font-size: 0.18rem;
  .select-text {
    margin-right: 0.15rem;
  }
  .icon-right {
    width: 0.16rem;
    height: 0.53rem;
  }
}
// .menu-wrapper {
//   background-color: rgba(0, 0, 0, 0.88);
// }
.block-line {
  display: inline-block;
  width: 0.01rem;
  background-color: #fff;
  height: 0.18rem;
  margin: 0 0.24rem;
}
</style>
