<template>
  <el-container class="full-height">
    <el-header>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
      >
        <div class="logo" index="0" @click="homeClick">
          <img
            style="width: 100px"
            src="../assets/mango-logo.png"
            alt="Element logo"
          />
        </div>
        <div class="flex-grow" />
        <div class="search" v-if="false">
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
    <el-main class="view">
      <RouterView />
    </el-main>
    <el-footer class="footer">
      <span>©2024 larkdance.cn</span>
      <span>
        ICP证:
        <a href="https://beian.miit.gov.cn/" target="_blank"
          >皖ICP备20002653号-2</a
        >
      </span>
    </el-footer>
  </el-container>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";

const activeIndex = ref("1");
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

const router = useRouter();
const homeClick = () => {
  router.push("/home");
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
.view {
  height: 100vh;
}
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  height: 48px;
  span + span {
    margin-left: 10px;
  }
}
</style>
