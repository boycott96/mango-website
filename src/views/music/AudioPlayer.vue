<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
const props = defineProps({
  audioUrl: String, //试听的链接
  isPauseTtsAudio: Boolean, //是否暂停播放试听
});
const audioIsPlay = ref(true); //音频是否在播放
const audioStart = ref("0:00");
const durationTime = ref("0:00"); //音频的总时长，显示的时间格式
const duration = ref(0); //音频的总时长
const audioVolume = ref(80); //音量的默认值是0.8
const audioHuds = ref(false); //是否显示音量slider
const audioRef = ref(null) as any;
const currentProgress = ref(0);

watch(
  () => props.isPauseTtsAudio,
  (newVal, _oldVal) => {
    if (newVal) {
      // 如果 isPauseTtsAudio 为 true，试听暂停
      handleCloseMusic();
    }
  }
);
function handleCloseMusic() {
  audioRef.value.pause();
  audioIsPlay.value = true;
}
onMounted(() => {
  calculateDuration();
});
// 获取音频时长
function calculateDuration() {
  var myVid = audioRef.value;
  myVid.loop = false;
  myVid.src = props.audioUrl;
  // 监听音频播放完毕
  myVid.addEventListener(
    "ended",
    function () {
      audioIsPlay.value = true;
      currentProgress.value = 0;
    },
    false
  );
  if (myVid != null) {
    myVid.oncanplay = function () {
      duration.value = myVid.duration; // 计算音频时长
      durationTime.value = transTime(myVid.duration); //换算成时间格式
    };
    myVid.volume = 0.8; // 设置默认音量50%
    // 进入页面默认开始播放
    audioRef.value.play();
    audioIsPlay.value = false;
  }
}
// 音频播放时间换算
function transTime(duration: any) {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  const formattedMinutes = String(minutes).padStart(2, "0"); //padStart(2,"0") 使用0填充使字符串长度达到2
  const formattedSeconds = String(seconds).padStart(2, "0");
  return `${formattedMinutes}:${formattedSeconds}`;
}
// 播放暂停控制
function playAudio() {
  if (audioRef.value.paused) {
    audioRef.value.play();
    audioIsPlay.value = false;
  } else {
    audioRef.value.pause();
    audioIsPlay.value = true;
  }
}
// 根据当前播放时间，实时更新进度条
function updateProgress(e: any) {
  var value = e.target.currentTime / e.target.duration;
  if (audioRef.value.play) {
    currentProgress.value = value * 100;
    audioStart.value = transTime(audioRef.value.currentTime);
  }
}
//调整播放进度
const handleProgressChange = (val: any) => {
  console.log(val);
  if (!val) {
    return;
  }
  let currentTime = duration.value * (val / 100);
  // 更新音频的当前播放时间
  audioRef.value.currentTime = currentTime;
};
//调整音量
const handleAudioVolume = (val: any) => {
  audioRef.value.volume = val / 100;
};
</script>

<template>
  <div class="audio-container">
    <audio @timeupdate="updateProgress" controls ref="audioRef" style="display: none">
      <source :src="audioUrl" type="audio/mpeg" />
    </audio>
    <div class="audio-left">
      <div class="audio-btn">
        <svg-icon iconName="backward"></svg-icon>
      </div>
      <div class="audio-btn" v-if="!audioIsPlay" @click="playAudio">
        <svg-icon iconName="pause"></svg-icon>
      </div>
      <div class="audio-btn" v-else @click="playAudio">
        <svg-icon iconName="play_music"></svg-icon>
      </div>
      <div class="audio-btn">
        <svg-icon iconName="forward"></svg-icon>
      </div>
      <!-- <el-slider
        class="slider_box"
        v-model="currentProgress"
        :show-tooltip="false"
        @input="handleProgressChange"
      /> -->
      <!-- <div class="audio_time">
        <span class="audio_current">{{ audioStart }}</span>
        &nbsp;/&nbsp;
        <span class="audio_total">{{ durationTime }}</span>
      </div> -->
      <!-- <div class="volume">
        <div class="volume_progress" v-show="audioHuds">
          <el-slider
            vertical
            height="100px"
            class="volume_bar"
            v-model="audioVolume"
            :show-tooltip="false"
            @change="handleAudioVolume"
          />
        </div>
        <div class="volume_icon" @click.stop="audioHuds = !audioHuds">
          <svg-icon iconName="speaker_wave"></svg-icon>
        </div> -->
      <!-- </div> -->
    </div>
    <div class="audio-body">
      <div class="body-top">
        <div class="song-picture">
          <img src="https://y.qq.com/music/photo_new/T002R300x300M000001odpSE070a4f_1.jpg?max_age=2592000" />
        </div>
        <div class="song-desc">
          <div class="title">Meltdown Mendy</div>
          <div class="songer">Niall Horan</div>
        </div>
        <div class="song-opertion">
          <div class="small-btn">
            <svg-icon iconName="repeat"></svg-icon>
          </div>
          <div class="small-btn">
            <svg-icon iconName="more"></svg-icon>
          </div>
        </div>
      </div>
    </div>
    <div class="audio-right">
      <div class="audio-btn">
        <svg-icon iconName="portrait"></svg-icon>
      </div>
      <div class="audio-btn">
        <svg-icon iconName="speaker_wave"></svg-icon>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.audio-container {
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 10vw;
  padding: 0.725vw;
  position: absolute;
  top: -2.275vw;
  display: flex;

  .audio-left {
    display: flex;
  }

  .audio-body {
    background-color: rgba(0, 0, 0, 0.14);
    border-radius: 0.5vw;
    .body-top {
      display: flex;

      .song-picture {
        img {
          width: 2.275vw;
          height: 2.275vw;
          border-radius: 0.5vw;
        }
      }

      .song-desc {
        margin-left: 1vw;
        width: 16vw;

        .title {
          color: white;
          width: 16vw;
          white-space: nowrap;
          /* 不换行 */
          overflow: hidden;
          /* 超出部分隐藏 */
          text-overflow: ellipsis;
          /* 显示省略号 */
        }

        .songer {
          color: rgba(255, 255, 255, 0.44);
          width: 16vw;
          white-space: nowrap;
          /* 不换行 */
          overflow: hidden;
          /* 超出部分隐藏 */
          text-overflow: ellipsis;
          /* 显示省略号 */
        }
      }

      .song-opertion {
        display: flex;
        align-items: center;
        
        .small-btn {
          .svg-icon {
            display: flex;
            align-items: center;
            padding: 1vw;
            width: 1vw;
            height: 1vw;
          }
        }
      }
    }
  }

  .audio-right {
    display: flex;
    margin-left: 1.5vw;
  }

  .audio-btn {
    padding: 0.5vw;
    cursor: pointer;

    .svg-icon {
      width: 1.5vw;
      height: 1.5vw;
    }

    // border: 1px solid red;
  }

  .audio-btn+.audio-btn {
    margin-left: 0.725vw;
  }
}
</style>
