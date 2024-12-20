import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  server: {
    host: true,
    port: 5000,
    watch: {
      usePolling: true
    }
  }
})


// {
//   include: /\.(js|jsx|ts|tsx|.scss)$/,
// }

// css: {
//   preprocessorOptions: {
//     scss: {
//       api: 'modern-compiler'
//     }
//   }
// },
