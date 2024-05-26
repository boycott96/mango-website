<script setup lang="ts">
import 'video.js/dist/video-js.css' // 引入video.js的样式文件
import videojs from 'video.js' // 引入video.js库
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const videoUrl = ref('')
const player = ref()

const route = useRoute()

onMounted(() => {
  const videoName = route.query.url
  console.log(videoName)
  videoUrl.value = `http://47.111.178.168:8778/hls/${videoName}/index.m3u8`
  nextTick(() => {
    getVideo(videoUrl.value)
  })
})

const videoPlayer = ref()
//初始化播放器
const getVideo = (url: string) => {
  nextTick(() => {
    const options = {
      autoplay: false, // 设置自动播放
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
    player.value = videojs(videoPlayer.value, options)
  })
}

onBeforeUnmount(() => {
  if (player.value) {
    player.value.dispose()
  }
})
</script>
<template>
  <div class="show-video">
    <video
      ref="videoPlayer"
      controls
      class="video-js vjs-default-skin vjs-big-play-centered"
      style="height: 100vh; width: 100%"
    >
      <!-- 这里可能是动态的，根据需要修改 -->
      <source :src="videoUrl" type="application/x-mpegURL" />
    </video>
  </div>
</template>
<style lang="scss" scoped>
.show-video {
  width: 100%;
}
</style>
