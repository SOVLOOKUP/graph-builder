import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    quasar({
      sassVariables: 'src/quasar-variables.sass',
    }),
  ],
  define: {
    'process.env': { ...process.env },
  },
  build: {
    target: 'esnext',
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
    },
  },
})
