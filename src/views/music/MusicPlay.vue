<script lang="ts" setup>
import { defineAsyncComponent, ref } from "vue";
const AudioPlayer = defineAsyncComponent(() => import("./AudioPlayer.vue"));

const lyrics = ref([]) as any;
const activeIndex = ref();
</script>
<template>
  <div class="play-container">
    <div class="play-body">
      <div class="left-record">
        <div class="record">
          <div class="record-pic">
            <div class="record-outer">
              <div class="record-inner">
                <img
                  src="https://y.qq.com/music/photo_new/T002R300x300M000001odpSE070a4f_1.jpg?max_age=2592000"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right-lrc">
        <div
          class="lyric"
          v-for="(line, index) in lyrics"
          :key="index"
          :class="{ active: index === activeIndex }"
        >
          {{ line.text }}
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <div class="music-bar">
        <div v-for="bar in 50" :key="bar" class="bar"></div>
      </div>
    </div>
    <div class="flex justify-center">
      <div class="play-bar">
        <audio-player />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.play-container {
  background: rgba(0, 0, 0, 0.1);
  height: 520px;
  width: 880px;
  background: linear-gradient(to right, #403f39, #4a4a4a, #4f4e46);
  /* 创建一个线性渐变 */
  animation: silk-flow 5s linear infinite;
  /* 设置流动动画 */
  border-radius: 20px;

  @keyframes silk-flow {
    0% {
      background-position: 0% 50%;
      /* 渐变起始位置 */
    }

    100% {
      background-position: 100% 50%;
      /* 渐变结束位置 */
    }
  }

  .play-body {
    display: flex;
    align-items: center;
    height: 100%;

    .left-record {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30vw;

      .record {
        background-color: #131313;
        padding: 1vw 2.275vw;
        border-radius: 2vw;

        .record-pic {
          background: #1f1f1f;
          padding: 1vw;
          border-radius: 50%;

          .record-outer {
            padding: 2.275vw;
            border-radius: 50%;
            background-image: radial-gradient(
              circle,
              rgba(255, 255, 255, 0.5),
              rgba(0, 0, 0, 0.5)
            );

            /* 添加线圈光晕效果 */
            .record-inner {
              background-color: #414038;
              padding: 0.525vw;
              width: 3vw;
              height: 3vw;
              border-radius: 50%;

              img {
                width: 3vw;
                height: 3vw;
                border-radius: 50%;
              }
            }
          }
        }
      }
    }
  }


  .music-bar {
    $background: #666;
    $text: #555;
    position: relative;
    width: 27.6vw;

    .bar {
      background: $background;
      bottom: 0.1vw;
      position: absolute;
      width: 0.425vw;
      animation: sound 0ms -800ms linear infinite alternate;
    }

    $border-radius: 50% 50% 0 0; // 设置底部边缘为半圆形

    @for $i from 1 through 26 {
      .bar:nth-child(#{$i}) {
        $left: 1vw * ($i + 1);
        $duration: random(100) + 400ms; // 生成400到500之间的随机值

        left: $left;
        animation-duration: $duration;
        background: linear-gradient(to top, #129b57, #00fd7e, #1e794a);
        border-radius: $border-radius;
        // 设置自定义属性
        // 计算距离中间 bar 的距离
        $distance-to-middle: abs(13 - $i);
        box-shadow: 0 0 1vw rgba(30, 120, 74, 0.7),
          0 0 1vw rgba(30, 120, 74, 0.7), 0 0 1vw rgba(30, 120, 74, 0.7),
          0 0 1vw rgba(30, 120, 74, 0.7); // 调整阴影效果以实现光晕

        --max-height: #{if(
            $distance-to-middle ==0,
            7vw,
            7vw - $distance-to-middle * 0.6vw
          )}; // 使用 Sass 变量设置自定义属性
      }
    }

    @keyframes sound {
      0% {
        opacity: 0.35;
        height: 0.6vw;
      }

      100% {
        opacity: 1;
        height: calc(var(--max-height) * 1); // 使用自定义属性设置高度
      }
    }
  }

  .play-bar {
    width: 42.8vw;
    position: relative;
  }
}
</style>
