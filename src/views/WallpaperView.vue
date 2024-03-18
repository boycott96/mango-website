<template>
  <el-descriptions title="壁纸信息">
    <template #extra>
      <el-button type="primary" @click="downloadImage(wallpaper.path)"
        >下载壁纸{{ wallpaper.resolution }}</el-button
      >
    </template>
    <el-descriptions-item label="壁纸大小">{{
      getFileSize(wallpaper.fileSize)
    }}</el-descriptions-item>
    <el-descriptions-item label="壁纸类型">{{
      wallpaper.fileType
    }}</el-descriptions-item>
    <el-descriptions-item label="分辨率">{{
      wallpaper.resolution
    }}</el-descriptions-item>
  </el-descriptions>
  <div>
    <el-image :src="wallpaper.path" lazy />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import api from "../api";
const props = defineProps({
  wallpaperId: {
    type: String,
    default: "",
  },
});

const wallpaper = ref({}) as any;
onMounted(() => {
  loadImage();
});

function loadImage() {
  api
    .request({
      url: "/wallpaper/detail",
      method: "get",
      params: { id: props.wallpaperId },
    })
    .then((res) => {
      wallpaper.value = res.data;
    });
}
function getFileSize(fileByte: any) {
  var fileSizeByte = fileByte;
  var fileSizeMsg = "";
  if (fileSizeByte < 1048576)
    fileSizeMsg = (fileSizeByte / 1024).toFixed(2) + "KB";
  else if (fileSizeByte == 1048576) fileSizeMsg = "1MB";
  else if (fileSizeByte > 1048576 && fileSizeByte < 1073741824)
    fileSizeMsg = (fileSizeByte / (1024 * 1024)).toFixed(2) + "MB";
  else if (fileSizeByte > 1048576 && fileSizeByte == 1073741824)
    fileSizeMsg = "1GB";
  else if (fileSizeByte > 1073741824 && fileSizeByte < 1099511627776)
    fileSizeMsg = (fileSizeByte / (1024 * 1024 * 1024)).toFixed(2) + "GB";
  else fileSizeMsg = "文件超过1TB";
  return fileSizeMsg;
}

function getFileName(url: string) {
  if (url) {
    // 找到最后一个斜杠的索引
    const lastSlashIndex = url.lastIndexOf("/");
    // 截取最后一个斜杠后面的部分
    const fileNameWithQuery = url.substring(lastSlashIndex + 1);
    // 如果文件名中包含查询参数，则再次截取，去掉查询参数部分
    const fileNameWithoutQuery = fileNameWithQuery.split("?")[0];
    // 返回文件名
    return fileNameWithoutQuery;
  }
  return "";
}
// 下载文件
const downloadImage = (url: string) => {
  const path = getFileName(url);
  window.open(
    `http://download.larkdance.cn/wallpaper/download/${path}`,
    "_blank"
  );
};
</script>
