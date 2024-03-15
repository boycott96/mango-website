<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <div class="logo" index="0">
      <img
        style="width: 100px"
        src="../assets/mango-logo.png"
        alt="Element logo"
      />
    </div>
    <div class="flex-grow" />
    <!-- <el-menu-item index="1">壁纸</el-menu-item> -->
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const activeIndex = ref("1");
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style>
.logo {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: 0;
  padding: 0 var(--el-menu-base-level-padding);
  list-style: none;
  cursor: pointer;
  position: relative;
  transition: border-color var(--el-transition-duration),
    background-color var(--el-transition-duration),
    color var(--el-transition-duration);
  box-sizing: border-box;
  white-space: nowrap;
}
.flex-grow {
  flex-grow: 1;
}
</style>
