<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter();

const leftMenuList = [
  { name: "play", path: "/music/play" },
  { name: "cross", path: "/music/hall" },
  { name: "music_tv", path: "/music/local" },
  { name: "radiowaves", path: "/music/radar" },
  { name: "music_list", path: "/music/songlist" },
  { name: "search", path: "/music/search" },
];

const handleSelect = (command: string) => {
  router.push(command);
};
</script>

<template>
  <div class="music-container container">
    <div class="music-body">
      <div class="music-left-menu">
        <template v-for="item in leftMenuList" :key="item.name">
          <div class="menu-btn" @click="handleSelect(item.path)">
            <svg-icon :iconName="item.name"></svg-icon>
          </div>
        </template>
      </div>
      <div class="music-right-body">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.music-container {
  background-image: url(../../assets/music/music_bg.jpg);
  background-size: cover;
  height: calc(100vh - 112px);
  display: flex;
  justify-content: center;
  align-items: center;
  .music-body {
    display: flex;
    align-items: center;
    .music-left-menu {
      background: rgba(0, 0, 0, 0.1);
      box-shadow: 0px 9px 7px 0px rgba(0, 0, 0, 0.05),
        inset 0px 1px 1px 0px rgba(255, 255, 255, 0.25),
        inset 0px -1px 1px 0px rgba(255, 255, 255, 0.25);
      border-radius: 119px 119px 119px 119px;
      padding: 20px;
      .menu-btn {
        padding: 20px;
        cursor: pointer;
        border-radius: 50px;
      }
      .menu-btn+.menu-btn {
        margin-top: 12px;
      }
      .menu-btn:hover {
        background: rgba(255, 255, 255, 0.3);
      }
      .active {
        background: rgba(255, 255, 255, 0.3);
      }
    }
    .music-right-body {
      margin-left: 40px;
      display: flex;
      width: 1080px;
    }
  }
  .svg-icon {
    width: 32px;
    height: 32px;
  }
}
</style>
