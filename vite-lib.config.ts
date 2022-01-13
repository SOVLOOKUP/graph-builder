import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/worker.ts',
      formats: ['es'],
      fileName: 'index',
    },
    outDir: `${process.env.NODE_ENV === 'production' ? 'dist/' : ''}worker`,
  },
})
