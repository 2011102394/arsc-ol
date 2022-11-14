import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { join } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  base: './',
  resolve: {
    alias: {
      '@': join(__dirname, 'src')
    }
  },
  build: {
    rollupOptions: {
      output: {
        // 静态资源合并打包
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        // 大文件分包
        // manualChunks: (id) => {
        //   if (id.includes('node_modules')) {
        //     return id
        //       .toString()
        //       .split('node_modules/')[1]
        //       .split('/')[1]
        //       .toString()
        //   }
        // }
      }
    }
  }
})
