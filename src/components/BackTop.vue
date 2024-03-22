<template>
  <div ref="btn" class="backtop">
    <el-button
      type="primary"
      :icon="Top"
      circle
      v-show="show"
      @click="backtop"
    ></el-button>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { Top } from "@element-plus/icons-vue";

const props = defineProps({
  length: {
    type: Number,
    default: 200,
  },
  bottom: {
    type: Number,
    default: 50,
  },
  right: {
    type: Number,
    default: 50,
  },
  speed: {
    type: Number,
    default: 100,
  },
});
const btn = ref();
onMounted(() => {
  btn.value.style.right = props.right + "px";
  btn.value.style.bottom = props.bottom + "px";
  btn.value.parentElement.onmousewheel = isShow();
});
const show = ref(false);
function backtop() {
  show.value = false;
  var parent = btn.value.parentElement;
  parent.scrollTop -= props.speed;
  if (parent.scrollTop > 0) {
    window.requestAnimationFrame(backtop() as any);
  }
}
function isShow() {
  if (btn.value.parentElement.scrollTop > props.length) show.value = true;
  else show.value = false;
}
</script>

<style>
.backtop {
  position: fixed;
  right: 50px;
  bottom: 50px;
}
</style>
