import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        lib: {
            entry: 'src/worker.ts',
            formats: ['es'],
            fileName: 'worker',
        },
        outDir: `public`,
        emptyOutDir: false
    },
})
