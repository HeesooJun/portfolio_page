import path from "node:path";

import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react(),
    // Tailwind CSS 4는 Vite 플러그인으로 연결하면 별도 PostCSS 설정 없이 동작합니다.
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // 기존 "@/..." 경로를 유지해 컴포넌트와 콘텐츠 파일의 수정 범위를 줄입니다.
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
