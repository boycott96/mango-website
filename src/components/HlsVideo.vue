<script setup lang="ts">
import 'video.js/dist/video-js.css' // 引入video.js的样式文件
import videojs from 'video.js' // 引入video.js库
import { nextTick, ref } from 'vue'

const visible = ref(false)

const videoUrl = ref('')
const player = ref()

const openDialog = (videoName: string) => {
  videoUrl.value = `http://47.111.178.168:8778/hls/${videoName}/index.m3u8`
  visible.value = true
  nextTick(() => {
    getVideo(videoUrl.value)
  })
}

//初始化播放器
const videoHtml = ref('')
const getVideo = (url: string) => {
  videoHtml.value =
    '<video id="videoPlayer" class="video-js vjs-default-skin" height="650px" width="960px" controls></video>'
  nextTick(() => {
    const options = {
      autoplay: true, // 设置自动播放
      controls: true, // 显示播放的控件
      sources: [
        //如果需要切换视频源，src需要动态设置
        {
          src: url,
          type: 'application/x-mpegURL' // 告诉videojs,这是一个hls流
        }
      ]
    }
    // videoJs的第一个参数表示的是，文档中video的id
    player.value = videojs('videoPlayer', options)
  })
}

const closeDialog = () => {
  if (player.value) {
    player.value.dispose()
    videoHtml.value = ''
  }
  visible.value = false
}
defineExpose({
  openDialog
})
</script>

<template>
  <el-dialog v-model="visible" class="dialog-video" width="960px" @close="closeDialog">
    <div v-html="videoHtml"></div>
  </el-dialog>
</template>
