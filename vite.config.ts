import path from "path";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
// 按需加载
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    vue(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(__dirname, "src/assets/icons/svg")],
      symbolId: "icon-[dir]-[name]"
    }),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/ // .vue
      ],
      dirs: ["./src"],
      imports: ["vue", "vue-router"], // 限定范围为 vue, vue-router
      dts: "types/auto-import.d.ts", // 自动生成 'auto-import.d.ts'全局声明
      resolvers: [ElementPlusResolver()]
    }),

    Components({
      // 按需导入组件，相关组件声明放置于 components.d.ts
      dts: "./types/components.d.ts",
      resolvers: [ElementPlusResolver()]
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  server: {
    port: 8000
  }
});
