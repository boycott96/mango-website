<template>
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
      @current-change="handleCurrentChange"
    />
  </div>
  <div class="wallpaper-body">
    <el-skeleton v-if="loading" :rows="10" />
    <template v-else v-for="item in wallpaperList" :key="item.id">
      <el-image
        class="wallpaper"
        :src="item.thumbnail"
        @click="viewImage(item.id)"
      />
    </template>
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
  pageNum: 1,
  pageSize: 50,
});
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
  loadWallpaper();
}
function handleCurrentChange(val: number) {
  pagination.pageNum = val;
  loadWallpaper();
}
function viewImage(val: number) {
  router.push(`/wallpaper/${val}`);
}
</script>
<style lang="scss" scoped>
.topic-row {
  display: flex;
  grid-gap: 0.5rem;
  gap: 0.5rem;
}
.wallpaper-body {
  .wallpaper {
    height: 184px;
    margin-left: 6px;
    margin-right: 5px;
    cursor: pointer;
    border-radius: 12px;
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
