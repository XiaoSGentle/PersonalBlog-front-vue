import { fileURLToPath, URL } from 'node:url'
import alias from "@rollup/plugin-alias";
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 引入Unocss
import Unocss from 'unocss/vite';
import { presetUno, presetAttributify, presetIcons } from 'unocss'
// 代码高亮
import prismjs from 'vite-plugin-prismjs';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  server: {
    port: 3000,
    //是否弹出浏览器
    open: false,
    //允许跨域
    cors: true,
  },
  plugins: [
    alias(),
    vue(),
    Unocss({ // 使用Unocss
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons()
      ],
    }),
    prismjs({
      languages: 'all',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
