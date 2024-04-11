<template>
  <div class="container">
    <div class="topic-row">
      <template v-for="item in topicList" :key="item.id">
        <el-check-tag
          class="topic"
          :checked="item.value"
          type="primary"
          @change="onChangeTopic(item)"
        >
          #{{ item.topic }}
        </el-check-tag>
      </template>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="pagination.pageNum"
        :page-size="pagination.pageSize"
        layout="prev, pager, next"
        background
        prev-text="上一页"
        next-text="下一页"
        :pager-count="5"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleSizeChange"
      />
    </div>
    <div class="wallpaper-body">
      <el-skeleton v-if="loading" :rows="10" />
      <template v-else v-for="item in wallpaperList" :key="item.id">
        <el-image
          class="wallpaper"
          fit="cover"
          :src="item.thumbnail"
          @click="viewImage(item.id)"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import api from "../api";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

interface Topic {
  id: number;
  topic: string;
  value: boolean;
}

interface Wallpaper {
  id: number;
  name: string;
  thumbnail: string;
}

const topicList = ref<Topic[]>([]);
const wallpaperList = ref<Wallpaper[]>([]);
const pagination = reactive<any>({
  pageNum: getPagination(),
  pageSize: isMobileDevice() ? 10 : 50,
});

// 判断是否是移动设备
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}
const loading = ref(true);
const total = ref(0);

onMounted(() => {
  loadWallpaper();
});

function loadWallpaper() {
  loading.value = true;
  api
    .request({
      url: "/wallpaper/page",
      method: "get",
      params: pagination,
    })
    .then((response) => {
      // 请求成功，处理响应数据
      wallpaperList.value = response.data.list;
      total.value = response.data.total;
      loading.value = false;
    })
    .catch((error) => {
      // 请求失败，处理错误
      console.error("Error fetching data:", error);
    });
}

function onChangeTopic(topic: Topic) {
  topic.value = !topic.value;
}

/**
 * 分页
 */
function handleSizeChange(val: number) {
  pagination.pageNum = val;
  savePagination(val);
  loadWallpaper();
}
function viewImage(val: number) {
  router.push(`/wallpaper/${val}`);
}

// 存储分页数据到 localStorage
function savePagination(pageNumber: any) {
  localStorage.setItem("paginationData", pageNumber);
}

// 从 localStorage 中获取分页数据
function getPagination() {
  const data = localStorage.getItem("paginationData");
  return data ? Number(data) : 1;
}
</script>
<style lang="scss" scoped>
.topic-row {
  display: flex;
  grid-gap: 0.5rem;
  gap: 0.5rem;
}
.wallpaper-body {
  display: flex;
  justify-content: space-between; /* 或者其他合适的对齐方式 */
  flex-wrap: wrap;
  .wallpaper {
    flex: 1 0 auto; /* 或者 flex: 1; */
    height: 184px;
    cursor: pointer;
    border-radius: 12px;
    /* 使内容div自适应宽度 */
    margin: 5px;
  }
  .wallpaper:hover {
    background-color: rgba(0, 0, 0, 0.03);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
  }
}
.pagination {
  margin-bottom: 12px;
  display: flex;
  justify-content: right;
}
</style>
