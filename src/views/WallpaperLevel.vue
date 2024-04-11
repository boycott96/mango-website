<template>
  <div>
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
    <div class="level-group">
      <el-radio-group v-model="pagination.level" @change="loadWallpaper">
        <template v-for="item in 6" :key="item">
          <el-radio-button :label="`L${item - 1}`" :value="item - 1" />
        </template>
      </el-radio-group>
    </div>
    <el-table :data="dataList" style="width: 100%">
      <el-table-column
        prop="name"
        label="名称"
        width="120"
        show-overflow-tooltip
      />
      <el-table-column
        prop="tags"
        label="标签"
        width="120"
        show-overflow-tooltip
      />
      <el-table-column prop="resolution" label="分辨率" width="120" />
      <el-table-column prop="level" label="等级" width="120" />
      <el-table-column label="预览" width="80">
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

      <el-table-column fixed="right" label="操作" width="140">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click="editRow(scope.row)"
            >编辑</el-button
          >
          <span />
          <el-button
            link
            type="primary"
            size="small"
            @click="shareRow(scope.row)"
            >分享</el-button
          >
          <input
            type="text"
            ref="shareInput"
            :value="shareUrl"
            style="display: none"
          />
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
  <el-dialog
    draggable
    v-model="dialogFormVisible"
    title="修改图片信息"
    width="390"
  >
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
            + 新标签
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
  level: 0,
  pageNum: 1,
  pageSize: 10,
});
const dataList = ref<any>();
const total = ref(0);
onMounted(() => {
  loadWallpaper();
});
const shareUrl = ref("");
const shareInput = ref();

function shareRow(obj: any) {
  shareUrl.value = obj.path;
  copyContent(shareUrl.value);
}

function loadWallpaper() {
  api
    .request({
      url: "/wallpaper/inner/page",
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
  level: 0,
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
  form.level = row.level;
  if (row.tags == null || row.tags == undefined) {
    form.tags = [];
  } else {
    form.tags = row.tags;
  }
}
function deleteRow(row: any) {
  api
    .request({
      url: `/wallpaper/delete/${row.id}`,
      method: "delete",
    })
    .then(() => {
      loadWallpaper();
    });
}

async function confirm() {
  await formRef.value.validate((valid: any, fields: any) => {
    if (valid) {
      dialogFormVisible.value = false;
      form.level = Number(form.level) + 1;
      api
        .request({
          url: "/wallpaper/update",
          method: "put",
          data: form,
        })
        .then(() => {
          loadWallpaper();
        });
      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
}

// 复制文本内容方法一
async function copyContent(content: string) {
  // 复制结果
  let copyResult = true;
  // 设置想要复制的文本内容
  const text = content || "复制内容为空哦~";
  // 判断是否支持clipboard方式
  if (window.navigator.clipboard) {
    // 利用clipboard将文本写入剪贴板（这是一个异步promise）
    await window.navigator.clipboard
      .writeText(text)
      .then()
      .catch((err) => {
        console.log("复制失败--采取第二种复制方案", err);
        // clipboard方式复制失败 则采用document.execCommand()方式进行尝试
        copyResult = copyContent2(text);
      });
  } else {
    // 不支持clipboard方式 则采用document.execCommand()方式
    copyResult = copyContent2(text);
  }
  // 返回复制操作的最终结果
  return copyResult;
}
// 复制文本内容方法二
function copyContent2(text: string) {
  // 复制结果
  let copyResult = true;
  // 创建一个input元素
  let inputDom = document.createElement("textarea");
  // 设置为只读 防止移动端手机上弹出软键盘
  inputDom.setAttribute("readonly", "readonly");
  // 给input元素赋值
  inputDom.value = text;
  // 将创建的input添加到body
  document.body.appendChild(inputDom);
  // 选中input元素的内容
  inputDom.select();
  // 执行浏览器复制命令
  // 复制命令会将当前选中的内容复制到剪切板中（这里就是创建的input标签中的内容）
  // Input要在正常的编辑状态下原生复制方法才会生效
  const result = document.execCommand("copy");
  // 判断是否复制成功
  if (result) {
    console.log(result);
  } else {
    console.error("无法复制到剪贴板: ");
    copyResult = false;
  }
  // 复制操作后再将构造的标签 移除
  document.body.removeChild(inputDom);
  // 返回复制操作的最终结果
  return copyResult;
}
/**
 * 分页
 */
function handleSizeChange(val: number) {
  pagination.pageNum = val;
  loadWallpaper();
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
.level-group {
  margin: 6px 0;
  display: flex;
  justify-content: right;
}
</style>
