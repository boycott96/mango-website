<template>
  <el-container class="full-height">
    <el-header>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        router
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
        <el-menu-item index="/music">音乐馆</el-menu-item>
        <el-menu-item index="/wallpaper">壁纸</el-menu-item>
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
    <el-scrollbar wrap-class="app-main-scroll-wrap">
      <el-main class="view">
        <div class="view-body">
          <RouterView />
        </div>
        <div class="footer">
          <div class="icp">
            <span>©2024</span>
            <span>
              ICP证:
              <a href="https://beian.miit.gov.cn/" target="_blank"
                >皖ICP备20002653号-2</a
              >
            </span>
          </div>
        </div>
      </el-main>
    </el-scrollbar>
  </el-container>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { Search } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";

const activeIndex = ref("music");
const router = useRouter();

onMounted(() => {
  updateActiveIndex();
  watch(router.currentRoute, updateActiveIndex);
});

/**
 * 更新默认路由
 */
const updateActiveIndex = () => {
  activeIndex.value = router.currentRoute.value.path;
  console.log(activeIndex.value);
};

const handleSelect = (key: string, _keyPath: string[]) => {
  router.push(key);
};

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
  padding: 0;

  .view-body {
    .container {
      padding: 20px 20px 32px 20px;
    }
  }
}
.footer {
  position: relative;
  .icp {
    position: absolute;
    width: 100%;
    bottom: 0;
    margin-top: 12px;
    text-align: center;
    font-size: 14px;
    height: 32px;
    span + span {
      margin-left: 10px;
    }
  }
}
</style>
