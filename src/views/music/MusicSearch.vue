<script lang="ts" setup>
import { ref } from "vue";
import { Plus } from "@element-plus/icons-vue";

const searchValue = ref("");
</script>
<template>
  <div class="search-container">
    <div class="title">
      <div>搜索</div>
    </div>
    <div class="top-search">
      <el-input v-model="searchValue" placeholder="搜索音乐">
        <template #prefix>
          <svg-icon iconName="search"></svg-icon>
        </template>
      </el-input>
    </div>
    <div class="notfound">
      <div class="tooltip">
        <el-alert
          title="没找到想要的资源"
          description="上传音乐资源链接，目前支持「QQ音乐」"
          type="info"
          :closable="false"
          show-icon
        />
      </div>
      <div class="option flex">
        <el-button class="add-music-btn" type="info" :icon="Plus"
          >添加音乐链接</el-button
        >
        <el-button class="add-music-btn" type="info" :icon="Plus"
          >添加歌单链接</el-button
        >
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.search-container {
  height: 520px;
  width: 880px;
  background-color: #b8b1b1;
  border-radius: 20px;
  .title {
    color: white;
    padding: 20px 20px 5px;
    font-size: 18px;
    font-weight: bold;
  }
  .top-search {
    margin: 16px 50px 16px 16px;
    .svg-icon {
      color: #d2d0d0;
    }
  }
  .notfound {
    margin: 16px 50px 16px 16px;
    .option {
      margin: 12px 0;
    }
    .add-music-btn {
      background-color: #c6c1c1;
      border: 0;
    }
  }
}
</style>
<style lang="scss">
.top-search {
  .el-input__wrapper {
    background-color: #9e9898;
    border-radius: 20px;
    border: 0;
    box-shadow: 0 0 0 1px #9e9898 inset;
  }
  .el-input__inner {
    color: #e6e4e4;
  }
  .is-focus {
    box-shadow: 0 0 0 1px #9e9898 inset;
  }
}
</style>
