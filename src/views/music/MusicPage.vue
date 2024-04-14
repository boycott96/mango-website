<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const leftMenuList = [
  { name: "play", path: "/music/play" },
  // { name: "cross", path: "/music/hall" },
  // { name: "music_tv", path: "/music/local" },
  // { name: "radiowaves", path: "/music/radar" },
  // { name: "music_list", path: "/music/songlist" },
  { name: "search", path: "/music/search" },
];

const handleSelect = (command: any) => {
  router.push(command.path);
  activeMenu.value = command.name;
};

const activeMenu = ref("search") as any;
</script>

<template>
  <div class="music-container container">
    <div class="music-body">
      <div class="music-left-menu">
        <div class="menu-outer">
          <template v-for="item in leftMenuList" :key="item.name">
            <div
              class="menu-btn"
              @click="handleSelect(item)"
              :class="{ active: activeMenu === item.name }"
            >
              <svg-icon :iconName="item.name"></svg-icon>
            </div>
          </template>
        </div>
      </div>
      <div class="music-right-body">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.music-container {
  background-color: #aca4a4;
  height: calc(100vh - 112px);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
  min-width: 984px;
  .music-body {
    display: flex;
    height: 560px;
    .music-left-menu {
      display: flex;
      align-items: center;
      .menu-outer {
        background: #9b9494;
        border-radius: 50px;
        padding: 6px;
      }
      .menu-btn {
        padding: 12px;
        cursor: pointer;
        border-radius: 50px;
      }

      .menu-btn + .menu-btn {
        margin-top: 12px;
      }

      .menu-btn:hover {
        background: #b9b4b4;
      }

      .active {
        background: #b9b4b4;
      }
    }

    .music-right-body {
      margin-left: 40px;
      display: flex;
    }
  }

  .svg-icon {
    width: 26px;
    height: 26px;
  }
}
</style>
