<template>
  <el-container>
    <el-header>
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
        <div class="search">
          <el-input
            v-model="searchValue"
            style="width: 240px"
            size="large"
            placeholder="Search..."
            @keyup.enter.native="searchFun"
            :prefix-icon="Search"
          />
        </div>
      </el-menu>
    </el-header>
    <el-main>
      <RouterView />
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Search } from "@element-plus/icons-vue";

const activeIndex = ref("1");
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

const searchValue = ref("");
const searchFun = () => {
  console.log(searchValue.value);
};
</script>

<style lang="scss">
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
.search {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-right: 64px;
  .el-input__wrapper {
    background: #f4f5fb !important;
    border-radius: 50px;
  }
}
.flex-grow {
  flex-grow: 1;
}
</style>
