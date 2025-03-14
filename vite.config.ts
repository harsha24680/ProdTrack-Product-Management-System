import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: "./", // Add this line
  plugins: [vue()],
})
