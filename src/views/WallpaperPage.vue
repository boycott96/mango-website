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
</template>

<script lang="ts" setup>
import { ref } from "vue";

interface Topic {
  id: number;
  topic: string;
  value: boolean;
}

const topicList = ref<Topic[]>([
  { id: 1, topic: "手机", value: false },
  { id: 2, topic: "4k", value: false },
  { id: 3, topic: "3k", value: false },
  { id: 4, topic: "2k", value: false },
  { id: 5, topic: "头像", value: false },
]);

function onChangeTopic(topic: Topic) {
  topic.value = !topic.value;
}
</script>
<style lang="scss" scoped>
.topic-row {
  display: flex;
  grid-gap: 0.5rem;
  gap: 0.5rem;
}
</style>
