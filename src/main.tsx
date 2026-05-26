import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from '@/App'
import '@/app/globals.css'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('애플리케이션 루트 요소를 찾을 수 없습니다.')
}

createRoot(rootElement).render(
  <StrictMode>
    {/* 개발 중 잠재적인 사이드 이펙트를 빨리 드러내기 위해 StrictMode를 유지합니다. */}
    <App />
  </StrictMode>,
)
