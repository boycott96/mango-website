import { defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { visualizer } from "rollup-plugin-visualizer";
import compressPlugin from "vite-plugin-compression"; //静态资源压缩
import { Plugin as importToCDN } from "vite-plugin-cdn-import";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), "src/assets/svg")],
      // 指定symbolId格式
      symbolId: "[name]",
    }),
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    visualizer({
      open: true,
      gzipSize: true,
    }),
    compressPlugin({
      //gzip静态资源压缩
      verbose: true, // 默认即可
      disable: false, //开启压缩(不禁用)，默认即可
      deleteOriginFile: false, //删除源文件
      threshold: 10240, //压缩前最小文件大小
      algorithm: "gzip", //压缩算法
      ext: ".gz", //文件类型
    }),
    importToCDN({
      modules: [
        {
          name: "vue",
          var: "Vue",
          path: "https://unpkg.com/vue@3.4.21/dist/vue.global.js",
        },
        {
          name: "vue-demi",
          var: "VueDemi",
          path: "https://unpkg.com/vue-demi@0.14.7/lib/index.iife.js",
        },
        {
          name: "vue-router",
          var: "VueRouter",
          path: "https://unpkg.com/vue-router@4.3.0",
        },
        {
          name: "element-plus",
          var: "ElementPlus",
          path: "https://unpkg.com/element-plus@2.4.2/dist/index.full.js",
          css: "https://unpkg.com/element-plus@2.4.2/dist/index.css",
        },
        {
          name: "lodash",
          var: "lodash",
          path: "https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js",
        },
      ],
    }),
  ],
  server: {
    host: "0.0.0.0",
    port: 5173,
    proxy: {
      "/api": {
        // target: "https://download.larkdance.cn",
        target: "http://localhost:9000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
