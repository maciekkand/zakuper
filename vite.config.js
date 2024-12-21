import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'pinia',
        // '@vueuse/core', // Optional, if you use VueUse
      ],
      dirs: [
        './src/composables',
        './src/utils',
        './src/stores',
      ],
      vueTemplate: true,
      resolvers: [
        // Add custom resolvers if needed
      ],
    }),
    Components({
      dirs: [
        './src/components',
        './src/assets'
      ],
      extensions: ['vue'],
      deep: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    watch: {
      usePolling: true,
    }
  },

})
