import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // 添加devServer配置的选项. 设置代理
  server: {
    proxy: {
      '/calendar': {
        target: 'http://v.juhe.cn/',
        changeOrigin: true,
      },
    },
  },
});
