import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createProxyMiddleware } from 'http-proxy-middleware';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/image_upload": 'http://localhost:8080',
      "/create/": 'http://127.0.0.1:8000/api/v1/profiles',
      "/profiles/": 'http://127.0.0.1:8000/api/v1',
    }
  }
})
