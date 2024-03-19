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
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click="editRow(scope.row)"
            >编辑</el-button
          >
          <el-button
            link
            type="danger"
            size="small"
            @click="deleteRow(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog v-model="dialogFormVisible" title="Shipping address" width="500">
    <el-form :model="form">
      <el-form-item label="Promotion name" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Zones" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="Please select a zone">
          <el-option label="Zone No.1" value="shanghai" />
          <el-option label="Zone No.2" value="beijing" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
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

// 弹窗

const dialogTableVisible = ref(false);
const dialogFormVisible = ref(false);
const formLabelWidth = "140px";

const form = reactive({
  name: "",
});

function editRow(row: any) {}
function deleteRow(row: any) {}
</script>
