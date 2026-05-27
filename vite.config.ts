import path from 'node:path'

import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    react(),
    // Tailwind CSS 4는 Vite 플러그인으로 연결하면 별도 PostCSS 설정 없이 동작합니다.
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // FSD-lite 구조에서도 "@/..." 절대 경로를 유지해 계층 간 import를 명확하게 만듭니다.
      '@': path.resolve(__dirname, './src'),
    },
  },
})
