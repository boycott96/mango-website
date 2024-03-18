<template>
  <div>
    <el-table :data="dataList" style="width: 100%">
      <el-table-column
        prop="name"
        label="名称"
        width="260"
        show-overflow-tooltip
      />
      <el-table-column prop="fileType" label="图片类型" width="120" />
      <el-table-column prop="fileSize" label="图片大小" width="120" />
      <el-table-column prop="level" label="等级" width="120" />
      <el-table-column prop="resolution" label="分辨率" width="120" />
      <el-table-column label="预览" width="120">
        <template #default="scope">
          <el-image
            :src="scope.row.thumbnail"
            :preview-src-list="[scope.row.path]"
            preview-teleported
            :zoom-rate="1.2"
            :max-scale="7"
            :min-scale="0.2"
            :initial-index="4"
            fit="cover"
          />
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作">
        <template #default>
          <el-button link type="primary" size="small">编辑</el-button>
          <el-button link type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import api from "../api";

const pagination = reactive<any>({
  pageNum: 1,
  pageSize: 10,
});
const dataList = ref<any>();
const total = ref(0);
onMounted(() => {
  loadWallpaper();
});

function loadWallpaper() {
  api
    .request({
      url: "/wallpaper/page",
      method: "get",
      params: pagination,
    })
    .then((response) => {
      // 请求成功，处理响应数据
      dataList.value = response.data.list;
      total.value = response.data.total;
    });
}
</script>
