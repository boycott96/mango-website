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
  <el-dialog v-model="dialogFormVisible" title="修改图片信息" width="500">
    <el-form :model="form" ref="formRef" :rules="rules" label-width="100px">
      <el-form-item label="图片名称" prop="name">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="标签数据" prop="tags">
        <div class="flex gap-2">
          <el-tag
            v-for="tag in form.tags"
            :key="tag"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >
            {{ tag }}
          </el-tag>
          <el-input
            v-if="inputVisible"
            ref="InputRef"
            v-model="inputValue"
            class="w-20"
            size="small"
            @keyup.enter="handleInputConfirm"
            @blur="handleInputConfirm"
          />
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showInput"
          >
            + New Tag
          </el-button>
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="confirm"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { nextTick, onMounted, reactive, ref } from "vue";
import api from "../api";
import { ElInput } from "element-plus";

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
const handleClose = (tag: string) => {
  form.tags.splice(form.tags.indexOf(tag), 1);
};
const inputValue = ref("");
const inputVisible = ref(false);

const dialogFormVisible = ref(false);
const formRef = ref();

const form = reactive({
  id: "",
  name: "",
  tags: [] as any,
});

const rules = reactive({
  name: [{ required: true, message: "名称不能为空", trigger: "blur" }],
  tags: [
    { type: "array", required: true, message: "标签不能为空", trigger: "blur" },
  ],
});

const handleInputConfirm = () => {
  if (inputValue.value) {
    console.log(inputValue.value);
    form.tags.push(inputValue.value);
  }
  inputVisible.value = false;
  inputValue.value = "";
};
const InputRef = ref<InstanceType<typeof ElInput>>();

const showInput = () => {
  inputVisible.value = true;
  nextTick(() => {
    InputRef.value!.input!.focus();
  });
};
function editRow(row: any) {
  dialogFormVisible.value = true;
  form.id = row.id;
  form.name = row.name;
  if (row.tags == null || row.tags == undefined) {
    form.tags = [];
  } else {
    form.tags = row.tags;
  }
}
function deleteRow(row: any) {}

async function confirm() {
  console.log(formRef.value);
  await formRef.value.validate((valid: any, fields: any) => {
    if (valid) {
      dialogFormVisible.value = false;

      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
}
</script>
<style lang="scss" scoped>
.flex {
  display: flex;
}
.gap-2 {
  grid-gap: 0.5rem;
  gap: 0.5rem;
}
</style>
